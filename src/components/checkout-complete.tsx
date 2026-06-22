"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart-provider";

export function CheckoutComplete() {
  const { clearCart } = useCart();
  const cleared = useRef(false);
  useEffect(() => { if (!cleared.current) { cleared.current = true; clearCart(); } }, [clearCart]);
  return <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5 sm:p-12"><CheckCircle2 className="mx-auto size-14 text-emerald-600" /><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-emerald-700">Payment received</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Thank you for your order.</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Stripe has confirmed your payment. DL Gadgets will contact you with collection or delivery details using the information provided at checkout.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/shop" className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white">Continue shopping</Link><Link href="/contact" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-800">Contact DL Gadgets</Link></div></div>;
}
