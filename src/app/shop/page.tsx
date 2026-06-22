import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/store";
import { ShopExperience } from "@/components/shop-experience";
import { getCategories, getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Shop electronics", description: "Browse DL Gadgets smartphones, tablets, gaming devices, security cameras, and more.", alternates: { canonical: "/shop" }, openGraph: { url: "/shop" } };
export const revalidate = 60;
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const [{ q }, products, categories] = await Promise.all([searchParams, getProducts(), getCategories()]); return <section className="py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} /><SectionHeading eyebrow="DL Gadgets catalog" title="Shop electronics">Filter by category, condition, availability, or online price. Request-price listings remain available for direct enquiry.</SectionHeading><ShopExperience products={products} categories={categories} initialQuery={q || ""} /></Container></section>; }
