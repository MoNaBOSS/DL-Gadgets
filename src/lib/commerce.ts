import type { Product } from "@/types";

export function getEffectivePrice(product: Pick<Product, "price" | "salePrice">) {
  const amount = product.salePrice ?? product.price;
  return typeof amount === "number" && Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function isPurchasable(product: Pick<Product, "requestPrice" | "inStock" | "quantity" | "price" | "salePrice">) {
  return !product.requestPrice && product.inStock && (product.quantity === null || product.quantity > 0) && getEffectivePrice(product) !== null;
}

export function formatPrice(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en-MT", { style: "currency", currency: currency || "EUR" }).format(amount);
}
