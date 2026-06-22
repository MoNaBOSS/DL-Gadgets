import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Gamepad2, Smartphone, Tablet } from "lucide-react";
import { CategoryCard, ContactCTA, Container, ProductGrid, SectionHeading, TrustBadges } from "@/components/store";
import { categories, products } from "@/lib/products";

export const metadata = { alternates: { canonical: "/" }, openGraph: { url: "/" } };

const popular = [
  [Smartphone, "Phones", "/category/smartphones", "Refurbished and quality-checked smartphones"],
  [Tablet, "Tablets", "/category/tablets", "Portable tech for work, home and school"],
  [Gamepad2, "Gaming", "/category/gaming-devices", "Classic and portable gaming devices"],
  [Camera, "Security", "/category/security-cameras", "Practical home monitoring essentials"],
] as const;

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return <>
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="grid gap-8 py-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:py-16">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-cyan-700">Electronics for Malta</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Electronics you can browse with confidence.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Phones, tablets, gaming, security, and everyday tech. Browse the catalog, request an order, and we&apos;ll confirm availability, price, and collection or delivery.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/shop" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-cyan-700">Shop all products <ArrowRight className="size-4" /></Link><Link href="/request-order" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:border-cyan-500">Request an order</Link></div>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:min-h-80"><Image src="/products/electronics-collection.webp" alt="DL Gadgets electronics collection" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
      </Container>
    </section>
    <section className="py-7"><Container><TrustBadges /></Container></section>
    <section className="py-10"><Container><SectionHeading eyebrow="Browse by category" title="Shop the technology you need." action={<Link href="/shop" className="text-sm font-bold text-cyan-700">View all products</Link>} /><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div></Container></section>
    <section className="bg-slate-50 py-12"><Container><SectionHeading eyebrow="Featured stock" title="Popular electronics available for enquiry.">Each listing shows the known condition and stock information. Final availability is confirmed directly by DL Gadgets.</SectionHeading><ProductGrid products={featured} /></Container></section>
    <section className="py-12"><Container><SectionHeading eyebrow="Shop with a purpose" title="Phones, tablets, gaming and security." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{popular.map(([Icon, title, href, copy]) => <Link key={title} href={href} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-cyan-500"><Icon className="size-7 text-cyan-700" /><h3 className="mt-8 font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-5 text-slate-600">{copy}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">Explore <ArrowRight className="size-4" /></span></Link>)}</div></Container></section>
    <section className="bg-slate-950 py-12 text-white"><Container><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">How ordering works</p><h2 className="mt-3 text-3xl font-black">A clear order process—no fake checkout.</h2><p className="mt-3 leading-7 text-slate-300">We confirm the details that matter before you commit.</p></div><ol className="grid gap-3 sm:grid-cols-2">{[["01", "Browse", "Explore product listings."], ["02", "Request", "Send the product and your details."], ["03", "Confirm", "We confirm price and availability."], ["04", "Collect / deliver", "Agree the practical next step."]].map(([number, title, copy]) => <li key={number} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="text-sm font-black text-cyan-300">{number}</span><h3 className="mt-3 font-black">{title}</h3><p className="mt-1 text-sm text-slate-300">{copy}</p></li>)}</ol></div></Container></section>
    <section className="py-12"><Container><ContactCTA /></Container></section>
  </>;
}
