import type { Metadata } from "next";
import { CategoryCard, Container, SectionHeading } from "@/components/store";
import { getCategories } from "@/lib/products";

export const metadata: Metadata = { title: "Categories", description: "Browse every DL Gadgets electronics category.", alternates: { canonical: "/categories" }, openGraph: { url: "/categories" } };
export const revalidate = 60;
export default async function CategoriesPage() { const categories = await getCategories(); return <section className="py-8 sm:py-12"><Container><SectionHeading eyebrow="Browse the store" title="Shop by category">Phones, tablets, gaming, security, accessories, and business devices.</SectionHeading><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div></Container></section>; }
