import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/store";
import { ShopExperience } from "@/components/shop-experience";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop electronics", description: "Browse DL Gadgets smartphones, tablets, gaming devices, security cameras, and more.", alternates: { canonical: "/shop" }, openGraph: { url: "/shop" } };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q } = await searchParams; return <section className="py-14 sm:py-18"><Container><SectionHeading eyebrow="DL Gadgets catalog" title="Find your next device.">Search across our product listings, filter by category or brand, then request current pricing and availability.</SectionHeading><ShopExperience products={products} categories={categories} initialQuery={q || ""} /></Container></section>; }
