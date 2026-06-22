import { NextResponse } from "next/server";
import { getEffectivePrice, isPurchasable } from "@/lib/commerce";
import { getProductById } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

type CheckoutItem = { id?: unknown; quantity?: unknown };

function validItem(value: unknown): value is CheckoutItem {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 10_000) return NextResponse.json({ error: "Cart request is too large." }, { status: 413 });
  let body: { items?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }
  if (!Array.isArray(body?.items) || !body.items.length || body.items.length > 20 || !body.items.every(validItem)) {
    return NextResponse.json({ error: "Add between one and twenty valid products to your cart." }, { status: 400 });
  }

  const requested = body.items.map((item) => ({
    id: typeof item.id === "string" && /^[A-Za-z0-9_-]{1,120}$/.test(item.id) ? item.id : "",
    quantity: typeof item.quantity === "number" && Number.isSafeInteger(item.quantity) ? item.quantity : 0,
  }));
  if (requested.some((item) => !item.id || item.quantity < 1 || item.quantity > 20) || new Set(requested.map((item) => item.id)).size !== requested.length) {
    return NextResponse.json({ error: "Cart items or quantities are invalid." }, { status: 400 });
  }

  const resolved = await Promise.all(requested.map(async (item) => ({ item, product: await getProductById(item.id) })));
  if (resolved.some(({ product }) => !product)) return NextResponse.json({ error: "One or more products are no longer available." }, { status: 409 });
  const unavailable = resolved.find(({ item, product }) => !product || !isPurchasable(product) || (typeof product.quantity === "number" && item.quantity > product.quantity));
  if (unavailable) return NextResponse.json({ error: "A product in your cart is unavailable, request-only, or does not have enough stock. Please review your cart." }, { status: 409 });

  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Online payments are not configured yet. Please request this product instead." }, { status: 503 });

  const currency = resolved[0]?.product?.currency?.toLowerCase() || "eur";
  if (resolved.some(({ product }) => product?.currency?.toLowerCase() !== currency)) return NextResponse.json({ error: "All cart products must use the same currency." }, { status: 409 });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      customer_creation: "always",
      line_items: resolved.map(({ item, product }) => {
        const amount = getEffectivePrice(product!);
        return {
          quantity: item.quantity,
          price_data: {
            currency,
            unit_amount: Math.round(amount! * 100),
            product_data: { name: product!.title, description: product!.shortDescription.slice(0, 500), metadata: { dlGadgetsProductId: product!.id, slug: product!.slug } },
          },
        };
      }),
      metadata: { cart: requested.map((item) => `${item.id}:${item.quantity}`).join(",") },
      success_url: `${siteConfig.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/checkout/cancel`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout creation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Secure checkout could not be started. Please try again or contact DL Gadgets." }, { status: 502 });
  }
}
