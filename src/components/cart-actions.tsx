"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { isPurchasable } from "@/lib/commerce";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/types";

export function CartIndicator() {
  const { itemCount } = useCart();
  return <Link href="/cart" className="relative inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-black text-white transition hover:border-cyan-300 hover:text-cyan-200" aria-label={`Cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}><ShoppingBag className="size-4" />Cart <span className="grid min-w-5 place-items-center rounded-full bg-cyan-400 px-1 py-0.5 text-[10px] text-slate-950">{itemCount}</span></Link>;
}

export function AddToCartButton({ product, buyNow = false, className = "" }: { product: Product; buyNow?: boolean; className?: string }) {
  const router = useRouter();
  const { addItem } = useCart();
  if (!isPurchasable(product)) return <Link href={`/request-order?product=${encodeURIComponent(product.title)}`} className={`inline-flex items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-700 ${className}`}>Request price</Link>;
  return <button type="button" onClick={() => { addItem(product); if (buyNow) router.push("/cart"); }} className={`inline-flex items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-700 ${className}`}>{buyNow ? "Buy now" : "Add to cart"}</button>;
}

export function CheckoutButton() {
  const { items } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const checkout = async () => {
    setStatus("loading"); setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map((item) => ({ id: item.product.id, quantity: item.quantity })) }) });
      const body = await response.json() as { url?: string; error?: string };
      if (!response.ok || !body.url) throw new Error(body.error || "Checkout could not be started.");
      window.location.assign(body.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout could not be started.");
      setStatus("error");
    }
  };
  return <div><button type="button" disabled={!items.length || status === "loading"} onClick={checkout} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">{status === "loading" && <LoaderCircle className="size-4 animate-spin" />}{status === "loading" ? "Opening secure checkout…" : "Secure checkout"}</button>{error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}</div>;
}
