import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendOrderNotification } from "@/lib/order-notification";
import { getSanityWriteClient } from "@/lib/sanity/client";
import { getStripe } from "@/lib/stripe";

type PaidLine = { productId: string; title: string; quantity: number; unitAmount: number };

function parseCart(value: string | null | undefined) {
  return (value || "").split(",").map((item) => {
    const [productId, quantity] = item.split(":");
    return { productId, quantity: Number(quantity) || 1 };
  }).filter((item) => /^[A-Za-z0-9_-]{1,120}$/.test(item.productId) && Number.isSafeInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20);
}

async function savePaidOrder(session: Stripe.Checkout.Session, items: PaidLine[]) {
  const client = getSanityWriteClient();
  if (!client) return null;
  const documentId = `order-${session.id}`;
  try {
    if (await client.getDocument(documentId)) return false;
    await client.create({
      _id: documentId,
      _type: "order",
      orderNumber: `DLG-${session.id.slice(-10).toUpperCase()}`,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
      customerName: session.customer_details?.name || "Not provided",
      customerEmail: session.customer_details?.email || "Not provided",
      customerPhone: session.customer_details?.phone || "Not provided",
      items,
      subtotal: (session.amount_subtotal || 0) / 100,
      total: (session.amount_total || 0) / 100,
      currency: (session.currency || "eur").toUpperCase(),
      paymentStatus: session.payment_status,
      orderStatus: "paid",
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Paid order persistence failed", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true });

  const session = event.data.object as Stripe.Checkout.Session;
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });
    const savedCart = parseCart(session.metadata?.cart);
    const items: PaidLine[] = lineItems.data.map((line, index) => ({
      productId: savedCart[index]?.productId || line.price?.product?.toString() || "stripe-line-item",
      title: line.description || "DL Gadgets product",
      quantity: line.quantity || savedCart[index]?.quantity || 1,
      unitAmount: ((line.amount_total || 0) / (line.quantity || 1)) / 100,
    }));
    const created = await savePaidOrder(session, items);
    if (created !== false) {
      const emailText = [
        `Paid DL Gadgets order: DLG-${session.id.slice(-10).toUpperCase()}`,
        `Customer: ${session.customer_details?.name || "Not provided"}`,
        `Email: ${session.customer_details?.email || "Not provided"}`,
        `Phone: ${session.customer_details?.phone || "Not provided"}`,
        `Total: ${((session.amount_total || 0) / 100).toFixed(2)} ${(session.currency || "EUR").toUpperCase()}`,
        "",
        ...items.map((item) => `${item.quantity} × ${item.title}`),
      ].join("\n");
      await sendOrderNotification(`Paid order: DLG-${session.id.slice(-10).toUpperCase()}`, emailText);
    }
  } catch (error) {
    console.error("Stripe checkout fulfillment failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Webhook fulfillment failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
