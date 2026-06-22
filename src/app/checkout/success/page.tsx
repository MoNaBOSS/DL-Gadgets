import type { Metadata } from "next";
import { CheckoutComplete } from "@/components/checkout-complete";
import { Container } from "@/components/store";

export const metadata: Metadata = { title: "Payment received", robots: { index: false, follow: false } };
export default function CheckoutSuccessPage() { return <section className="py-14 sm:py-20"><Container><CheckoutComplete /></Container></section>; }
