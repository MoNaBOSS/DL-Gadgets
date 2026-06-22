"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

type FormState = { name: string; phone: string; email: string; product: string; quantity: string; contactMethod: string; message: string };
type Fallback = { url: string; label: string } | null;
const initialState: FormState = { name: "", phone: "", email: "", product: "", quantity: "1", contactMethod: "WhatsApp", message: "" };

export function OrderRequestForm({ product = "" }: { product?: string }) {
  const [form, setForm] = useState<FormState>({ ...initialState, product });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [fallback, setFallback] = useState<Fallback>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim()) || !Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 1) {
      setError("Add your name, a phone number or email address, and a whole-number quantity of at least 1.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/order-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your request.");
      setFallback(result.fallback || null);
      setNotice(result.message || "Your request has been sent to DL Gadgets.");
      setStatus("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to send your request.");
      setStatus("idle");
    }
  };

  if (status === "success") return <div role="status" aria-live="polite" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"><CheckCircle2 className="mx-auto size-12 text-emerald-600" /><h2 className="mt-4 text-2xl font-black text-slate-950">Order request ready</h2><p className="mx-auto mt-3 max-w-md text-slate-600">Thanks, {form.name}. {notice}</p>{fallback && <a href={fallback.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">{fallback.label}</a>}</div>;

  return <form onSubmit={submit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" value={form.name} onChange={(value) => update("name", value)} required autoComplete="name" /><Field label="Phone / WhatsApp" type="tel" value={form.phone} onChange={(value) => update("phone", value)} autoComplete="tel" inputMode="tel" /><Field label="Email address" type="email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" /><Field label="Product" value={form.product} onChange={(value) => update("product", value)} placeholder="What would you like to enquire about?" /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Quantity" type="number" value={form.quantity} onChange={(value) => update("quantity", value)} required min="1" step="1" inputMode="numeric" /><label className="grid gap-2 text-sm font-bold text-slate-800">Preferred contact method<select value={form.contactMethod} onChange={(event) => update("contactMethod", event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-500"><option>WhatsApp</option><option>Phone</option><option>Email</option></select></label></div><label className="grid gap-2 text-sm font-bold text-slate-800">Message <span className="font-normal text-slate-400">(optional)</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows={4} placeholder="Questions, preferred collection/delivery, or anything else…" className="resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-500" /></label>{error && <p role="alert" aria-live="assertive" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}<button disabled={status === "loading"} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-cyan-700 disabled:opacity-70">{status === "loading" && <LoaderCircle className="size-4 animate-spin" />}{status === "loading" ? "Sending request…" : "Send order request"}</button><p className="text-center text-xs leading-5 text-slate-500">No card payment is taken online. Availability, price, and delivery or collection are confirmed by DL Gadgets.</p></form>;
}

function Field({ label, value, onChange, required, type = "text", placeholder, min, step, autoComplete, inputMode }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; placeholder?: string; min?: string; step?: string; autoComplete?: string; inputMode?: "email" | "numeric" | "tel" | "text" }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-800">{label}{required && <span aria-hidden="true" className="text-cyan-700">*</span>}<input type={type} min={min} step={step} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" /></label>;
}
