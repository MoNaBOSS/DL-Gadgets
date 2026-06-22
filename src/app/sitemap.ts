import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { const staticPages = ["", "/shop", "/about", "/contact", "/request-order"]; return [...staticPages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : .7 })), ...categories.map((item) => ({ url: `${siteConfig.url}/category/${item.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .8 })), ...products.map((item) => ({ url: `${siteConfig.url}/shop/${item.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .6 }))]; }
