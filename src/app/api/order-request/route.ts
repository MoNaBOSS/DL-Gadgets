import { NextResponse } from "next/server";

type OrderRequest = {
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  quantity?: string;
  contactMethod?: string;
  message?: string;
};

const clean = (value: unknown, length = 1000) =>
  typeof value === "string" ? value.trim().slice(0, length) : "";

const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
};

function createFallback(text: string) {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  if (whatsapp) return { url: `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, label: "Send via WhatsApp" };

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (email) return {
    url: `mailto:${email}?subject=${encodeURIComponent("DL Gadgets order request")}&body=${encodeURIComponent(text)}`,
    label: "Send via email",
  };

  return null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let input: OrderRequest;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = {
    name: clean(input.name, 120),
    phone: clean(input.phone, 80),
    email: clean(input.email, 160),
    product: clean(input.product, 180),
    quantity: clean(input.quantity, 8),
    contactMethod: clean(input.contactMethod, 30),
    message: clean(input.message, 1500),
  };
  const quantity = Number(data.quantity);

  if (!data.name || (!data.phone && !data.email) || !Number.isSafeInteger(quantity) || quantity < 1) {
    return NextResponse.json({ error: "Please provide a name, phone or email, and a whole-number quantity of at least 1." }, { status: 400 });
  }
  if (data.email && !isValidEmail(data.email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (data.phone && !isValidPhone(data.phone)) {
    return NextResponse.json({ error: "Enter a valid phone or WhatsApp number." }, { status: 400 });
  }

  const contactMethod = ["WhatsApp", "Phone", "Email"].includes(data.contactMethod) ? data.contactMethod : "Not specified";
  const text = `New DL Gadgets order request\n\nName: ${data.name}\nPhone: ${data.phone || "Not provided"}\nEmail: ${data.email || "Not provided"}\nProduct: ${data.product || "General enquiry"}\nQuantity: ${quantity}\nPreferred contact: ${contactMethod}\nMessage: ${data.message || "None"}`;
  const fallback = createFallback(text);
  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL || process.env.ORDER_TO_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL || "DL Gadgets Orders <orders@resend.dev>";

  if (!notificationEmail || !resendApiKey) {
    if (fallback) {
      return NextResponse.json({ delivery: "fallback", fallback, message: "Email notifications are not configured. Please complete your request using the contact option below." });
    }
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ delivery: "development", message: "Your request is valid. Configure email or a public contact fallback before accepting production requests." });
    }
    return NextResponse.json({ error: "Order requests are not configured yet. Please contact DL Gadgets directly." }, { status: 503 });
  }

  try {
    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: resendFrom, to: [notificationEmail], subject: `Order request: ${data.product || "General enquiry"}`, text }),
    });

    if (!resend.ok) throw new Error("Email provider rejected the request.");
    return NextResponse.json({ delivery: "email", message: "Your request has been sent to DL Gadgets." });
  } catch {
    if (fallback) {
      return NextResponse.json({ delivery: "fallback", fallback, message: "We could not send the email notification. Please complete your request using the contact option below." });
    }
    return NextResponse.json({ error: "We could not deliver the request right now. Please try again shortly or contact DL Gadgets directly." }, { status: 502 });
  }
}
