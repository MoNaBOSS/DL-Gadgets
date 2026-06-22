import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Boxes, CheckCircle2, ChevronRight, Cpu, Gamepad2, Headphones, PackageCheck, RadioTower, ShieldCheck, Smartphone, Tablet, Wifi } from "lucide-react";
import type { Category, CategoryName, Product } from "@/types";

const categoryIcons: Record<CategoryName, ComponentType<{ className?: string }>> = {
  Smartphones: Smartphone, Tablets: Tablet, "Gaming Devices": Gamepad2, "Security Cameras": ShieldCheck,
  Accessories: Headphones, "Smart Devices": Wifi, "Enterprise Devices": RadioTower, "Clearance / Used Devices": Boxes,
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string }) {
  const styles = variant === "primary" ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200" : variant === "secondary" ? "border border-white/20 bg-white/5 text-white hover:border-cyan-300/70 hover:bg-white/10" : "text-cyan-200 hover:text-white";
  return <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${styles} ${className}`}>{children}<ArrowRight className="size-4" /></Link>;
}

export function SectionHeading({ eyebrow, title, children, action }: { eyebrow?: string; title: string; children?: ReactNode; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p><h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>{children && <p className="mt-3 text-base leading-7 text-slate-600">{children}</p>}</div>{action}</div>;
}

export function ProductArt({ category, small = false }: { category: CategoryName; small?: boolean }) {
  const Icon = categoryIcons[category] || Cpu;
  return <div className={`relative grid place-items-center overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 ${small ? "h-20" : "h-52"}`}><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(34,211,238,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.25)_1px,transparent_1px)] [background-size:20px_20px]" /><div className="absolute h-24 w-24 rounded-full bg-cyan-400/25 blur-2xl" /><Icon className={`${small ? "size-9" : "size-20"} relative text-cyan-200`} /><span className="absolute bottom-3 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-100">{category}</span></div>;
}

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.title];
  return <Link href={`/category/${category.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/10"><div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><Icon className="size-6" /></div><h3 className="font-bold text-slate-950">{category.title}</h3><p className="mt-2 min-h-12 text-sm leading-5 text-slate-500">{category.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">Browse category <ChevronRight className="size-4 transition group-hover:translate-x-1" /></span></Link>;
}

export function ProductCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"><Link href={`/shop/${product.slug}`} className="block p-3"><ProductArt category={product.category} /><div className="px-1 pt-5"><div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-wider text-cyan-700">{product.brand}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${product.inStock ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{product.inStock ? "Enquire now" : "Check availability"}</span></div><h3 className="min-h-12 text-base font-bold leading-6 text-slate-950 group-hover:text-cyan-700">{product.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{product.shortDescription}</p></div></Link><div className="mt-4 flex items-center justify-between border-t border-slate-100 px-4 py-4"><span className="text-sm font-black text-slate-950">Request price</span><Link href={`/request-order?product=${encodeURIComponent(product.title)}`} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-cyan-700">Request order</Link></div></article>;
}

export function ProductGrid({ products }: { products: Product[] }) { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>; }

export function EmptyState({ title = "No products found", text = "Try a different search term or reset your filters." }: { title?: string; text?: string }) { return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center"><PackageCheck className="mx-auto size-10 text-cyan-600" /><h3 className="mt-4 font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm text-slate-500">{text}</p></div>; }

export function TrustBadges() { const items = [[ShieldCheck, "Malta-based support", "Helpful local service"], [CheckCircle2, "Quality checked", "Condition clearly shown"], [PackageCheck, "Fast response", "Availability confirmed directly"], [Headphones, "Order with confidence", "No payment required online"]] as const; return <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{items.map(([Icon, title, text]) => <div key={title} className="bg-slate-950/80 p-5"><Icon className="size-5 text-cyan-300" /><p className="mt-4 text-sm font-bold text-white">{title}</p><p className="mt-1 text-xs text-slate-400">{text}</p></div>)}</div>; }

export function ContactCTA() { return <section className="overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-12"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-300">Need something specific?</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Tell us what you are looking for.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-300">We can confirm current availability, answer product questions, and arrange a practical next step for collection or delivery in Malta.</p></div><Button href="/contact" variant="secondary">Contact DL Gadgets</Button></div></section>; }

export function ProductDetail({ product }: { product: Product }) { return <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]"><ProductArt category={product.category} /><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{product.category}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{product.condition}</span></div><p className="mt-6 text-sm font-bold uppercase tracking-[.18em] text-cyan-700">{product.brand}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{product.title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{product.description || product.shortDescription}</p><dl className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-100 p-4"><dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Condition</dt><dd className="mt-1 font-bold text-slate-950">{product.condition}</dd></div><div className="rounded-xl bg-slate-100 p-4"><dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Availability</dt><dd className="mt-1 font-bold text-slate-950">{product.quantity ? `${product.quantity} listed` : "Confirm with us"}</dd></div></dl><div className="mt-8"><Button href={`/request-order?product=${encodeURIComponent(product.title)}`}>Request price & order</Button><p className="mt-4 text-sm text-slate-500">Final price and availability are confirmed directly by DL Gadgets.</p></div></div></div>; }
