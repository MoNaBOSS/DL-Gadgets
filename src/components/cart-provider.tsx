"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types";
import { getEffectivePrice, isPurchasable } from "@/lib/commerce";

export type CartProduct = Pick<Product, "id" | "title" | "slug" | "brand" | "category" | "condition" | "price" | "salePrice" | "currency" | "requestPrice" | "inStock" | "quantity" | "image">;
export type CartItem = { product: CartProduct; quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "dl-gadgets-cart-v1";

function quantityFor(product: CartProduct, quantity: number) {
  const maximum = typeof product.quantity === "number" ? Math.max(product.quantity, 1) : 20;
  return Math.max(1, Math.min(Math.floor(quantity) || 1, maximum, 20));
}

function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is CartItem => Boolean(item && typeof item === "object" && "product" in item && "quantity" in item && typeof item.quantity === "number" && item.product && typeof item.product === "object" && "id" in item.product && typeof item.product.id === "string")).slice(0, 20).map((item) => ({ ...item, quantity: quantityFor(item.product, item.quantity) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const restored = useRef(false);

  useEffect(() => {
    const restore = window.setTimeout(() => { restored.current = true; setItems(readCart()); }, 0);
    return () => window.clearTimeout(restore);
  }, []);
  useEffect(() => { if (restored.current) window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + (getEffectivePrice(item.product) || 0) * item.quantity, 0),
    addItem(product, quantity = 1) {
      if (!isPurchasable(product)) return;
      const cartProduct: CartProduct = { id: product.id, title: product.title, slug: product.slug, brand: product.brand, category: product.category, condition: product.condition, price: product.price, salePrice: product.salePrice, currency: product.currency, requestPrice: product.requestPrice, inStock: product.inStock, quantity: product.quantity, image: product.image };
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (!existing) return [...current, { product: cartProduct, quantity: quantityFor(cartProduct, quantity) }].slice(0, 20);
        return current.map((item) => item.product.id === product.id ? { ...item, product: cartProduct, quantity: quantityFor(cartProduct, item.quantity + quantity) } : item);
      });
    },
    removeItem(productId) { setItems((current) => current.filter((item) => item.product.id !== productId)); },
    updateQuantity(productId, quantity) { setItems((current) => current.map((item) => item.product.id === productId ? { ...item, quantity: quantityFor(item.product, quantity) } : item)); },
    clearCart() { setItems([]); },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
