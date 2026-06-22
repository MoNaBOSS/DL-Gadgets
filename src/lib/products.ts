import { categories, products } from "@/data/products";
import type { Product } from "@/types";

export { categories, products };

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3) {
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, count);
}
