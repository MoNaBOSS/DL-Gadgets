import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";
import { Breadcrumb, Container } from "@/components/store";

export const metadata: Metadata = { title: "Your cart", robots: { index: false, follow: false } };

export default function CartRoute() {
  return <section className="py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} /><h1 className="mb-7 text-3xl font-black tracking-tight text-slate-950">Your cart</h1><CartPage /></Container></section>;
}
