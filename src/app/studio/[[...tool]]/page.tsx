import type { Metadata } from "next";
import Link from "next/link";
import { SanityStudio } from "@/components/sanity-studio";

export const metadata: Metadata = { title: "Store admin", robots: { index: false, follow: false } };

export default function StudioPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);
  if (!configured) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-white"><section className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">DL Gadgets admin</p><h1 className="mt-3 text-3xl font-black">Connect Sanity to open the store admin.</h1><p className="mt-4 leading-7 text-slate-300">Set <code className="text-cyan-200">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code className="text-cyan-200">NEXT_PUBLIC_SANITY_DATASET</code> in your environment, then redeploy. The setup guide explains the exact steps.</p><Link href="/" className="mt-6 inline-flex rounded-lg bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950">Back to storefront</Link></section></main>;
  }
  return <SanityStudio />;
}
