import { permanentRedirect } from "next/navigation";

export default async function ProductsSlugPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; permanentRedirect(`/shop/${slug}`); }
