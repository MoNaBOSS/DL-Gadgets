import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/store";
import { ShopExperience } from "@/components/shop-experience";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop electronics", description: "Browse DL Gadgets smartphones, tablets, gaming devices, security cameras, and more.", alternates: { canonical: "/shop" }, openGraph: { url: "/shop" } };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; return <section className="py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} /><SectionHeading eyebrow="DL Gadgets catalog" title="Shop electronics">Browse the current catalog, filter your choices, then request price and availability directly.</SectionHeading><ShopExperience products={products} categories={categories} initialQuery={q || ""} /></Container></section>; }
