import { categories as fallbackCategories, products as fallbackProducts } from "@/data/products";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { categoryQuery, productByIdQuery, productBySlugQuery, productQuery } from "@/lib/sanity/query";
import type { Category, CategoryName, Product, ProductSpec, ProductStatus } from "@/types";

export const categories = fallbackCategories;
export const products = fallbackProducts;

type SanityProduct = Omit<Product, "id" | "category"> & {
  _id: string;
  category?: string;
  status?: ProductStatus;
  specs?: ProductSpec[];
};

const categoryNames = new Set<CategoryName>(fallbackCategories.map((category) => category.title));

function categoryName(value: string | undefined): CategoryName {
  return categoryNames.has(value as CategoryName) ? value as CategoryName : "Clearance / Used Devices";
}

function cleanNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function normalizeProduct(product: SanityProduct): Product {
  const images = Array.isArray(product.images) ? product.images.filter((image): image is string => typeof image === "string") : [];
  return {
    id: product._id,
    title: product.title,
    slug: product.slug,
    brand: product.brand || "DL Gadgets",
    category: categoryName(product.category),
    quantity: cleanNumber(product.quantity),
    condition: product.condition || "Unknown",
    price: cleanNumber(product.price),
    salePrice: cleanNumber(product.salePrice),
    currency: (product.currency || "EUR").toUpperCase(),
    requestPrice: Boolean(product.requestPrice),
    shortDescription: product.shortDescription || "Contact DL Gadgets for current availability and product details.",
    description: product.description || product.shortDescription,
    image: product.image || images[0],
    images,
    specs: Array.isArray(product.specs) ? product.specs.filter((spec) => spec?.key && spec?.value) : [],
    featured: Boolean(product.featured),
    inStock: Boolean(product.inStock),
    tags: Array.isArray(product.tags) ? product.tags.filter((tag): tag is string => typeof tag === "string") : [],
    status: product.status || "active",
  };
}

async function fetchSanity<T>(query: string, params: Record<string, string> = {}): Promise<T | undefined> {
  if (!isSanityConfigured()) return undefined;
  try {
    return await getSanityClient().fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Sanity catalog fetch failed", error instanceof Error ? error.message : "Unknown error");
    return undefined;
  }
}

export async function getProducts(): Promise<Product[]> {
  const result = await fetchSanity<SanityProduct[]>(productQuery);
  if (result === undefined) return fallbackProducts;
  return result.map(normalizeProduct).filter((product) => product.status === "active");
}

export async function getCategories(): Promise<Category[]> {
  const result = await fetchSanity<Array<Omit<Category, "title"> & { _id: string; title: string }>>(categoryQuery);
  if (result === undefined) return fallbackCategories;
  return result.filter((category) => categoryNames.has(category.title as CategoryName)).map((category) => ({
    title: category.title as CategoryName,
    slug: category.slug,
    description: category.description || "Explore the latest DL Gadgets stock.",
    image: category.image,
    featured: Boolean(category.featured),
    sortOrder: typeof category.sortOrder === "number" ? category.sortOrder : undefined,
  }));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const result = await fetchSanity<SanityProduct>(productBySlugQuery, { slug });
  if (result !== undefined) {
    if (!result) return undefined;
    const product = normalizeProduct(result);
    return product.status === "active" ? product : undefined;
  }
  return fallbackProducts.find((product) => product.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const result = await fetchSanity<SanityProduct>(productByIdQuery, { id });
  if (result !== undefined) {
    if (!result) return undefined;
    const product = normalizeProduct(result);
    return product.status === "active" ? product : undefined;
  }
  return fallbackProducts.find((product) => product.id === id);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const allCategories = await getCategories();
  return allCategories.find((category) => category.slug === slug);
}

export async function getRelatedProducts(product: Product, count = 3): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, count);
}
