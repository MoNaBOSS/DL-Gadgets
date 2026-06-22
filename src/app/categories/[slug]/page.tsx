import { permanentRedirect } from "next/navigation";

export default async function CategoriesSlugPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; permanentRedirect(`/category/${slug}`); }
