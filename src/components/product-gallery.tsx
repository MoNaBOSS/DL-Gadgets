"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/types";

const fallbackImages: Record<Product["category"], string> = { Smartphones: "/products/smartphone-studio.webp", Tablets: "/placeholders/tablet.webp", "Gaming Devices": "/placeholders/gaming.webp", "Security Cameras": "/placeholders/security-camera.webp", Accessories: "/placeholders/accessory.webp", "Smart Devices": "/placeholders/accessory.webp", "Enterprise Devices": "/placeholders/enterprise-device.webp", "Clearance / Used Devices": "/placeholders/smartphone.webp" };

export function ProductGallery({ product }: { product: Product }) { const images = useMemo(() => Array.from(new Set([...(product.images || []), product.image || fallbackImages[product.category]].filter(Boolean))), [product]); const [selected, setSelected] = useState(0); const source = images[Math.min(selected, images.length - 1)]; return <div><div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white"><Image src={source} alt={`${product.title} image ${selected + 1}`} fill preload sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>{images.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">{images.map((image, index) => <button type="button" key={image} onClick={() => setSelected(index)} aria-label={`View image ${index + 1}`} aria-pressed={selected === index} className={`relative aspect-square overflow-hidden rounded-lg border-2 ${selected === index ? "border-cyan-500" : "border-transparent"}`}><Image src={image} alt="" fill sizes="100px" className="object-cover" /></button>)}</div>}</div>; }
