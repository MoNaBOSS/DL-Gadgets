import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, EmptyState, ProductGrid, SectionHeading } from "@/components/store";
import { categories, products } from "@/lib/products";

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const category = categories.find((item) => item.slug === slug); return category ? { title: category.title, description: category.description, alternates: { canonical: `/category/${category.slug}` }, openGraph: { title: category.title, description: category.description, url: `/category/${category.slug}` } } : {}; }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const category = categories.find((item) => item.slug === slug); if (!category) notFound(); const items = products.filter((product) => product.category === category.title); return <section className="py-14 sm:py-18"><Container><SectionHeading eyebrow="Product category" title={category.title}>{category.description}</SectionHeading>{items.length ? <ProductGrid products={items} /> : <EmptyState title="More stock is being added" text="Send DL Gadgets an enquiry for this category and we will help source the right device." />}</Container></section>; }
