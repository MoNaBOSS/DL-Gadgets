import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: "DL Gadgets | Malta Electronics", template: "%s | DL Gadgets" }, description: siteConfig.description, alternates: { canonical: "/" }, openGraph: { type: "website", locale: "en_MT", siteName: siteConfig.name, url: "/", title: "DL Gadgets | Your Tech Revolution", description: siteConfig.description }, twitter: { card: "summary_large_image" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="min-h-screen bg-slate-50 text-slate-950 antialiased"><CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider></body></html>; }
