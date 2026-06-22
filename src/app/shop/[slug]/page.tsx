import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, ProductGrid, SectionHeading } from "@/components/store";
import { getProduct, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = getProduct(slug); return product ? { title: product.title, description: product.shortDescription, alternates: { canonical: `/shop/${product.slug}` }, openGraph: { title: product.title, description: product.shortDescription, url: `/shop/${product.slug}` } } : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = getProduct(slug); if (!product) notFound(); const related = getRelatedProducts(product); const { ProductDetail } = await import("@/components/store"); return <><section className="py-12 sm:py-18"><Container><ProductDetail product={product} /></Container></section>{related.length > 0 && <section className="border-t border-slate-200 bg-white py-16"><Container><SectionHeading eyebrow="More to explore" title="Related devices" /><ProductGrid products={related} /></Container></section>}</>; }
