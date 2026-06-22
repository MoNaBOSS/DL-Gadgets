import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/store";

export const metadata: Metadata = { title: "Checkout cancelled", robots: { index: false, follow: false } };
export default function CheckoutCancelPage() { return <section className="py-14 sm:py-20"><Container><div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5 sm:p-12"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Checkout cancelled</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Your cart is still waiting for you.</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">No payment was taken. Return to your cart to review your products, or request a personal quote from DL Gadgets.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/cart" className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white">Return to cart</Link><Link href="/request-order" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-800">Request a quote</Link></div></div></Container></section>; }
