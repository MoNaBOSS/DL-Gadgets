export const siteConfig = {
  name: "DL Gadgets",
  tagline: "Your Tech Revolution | Online Store",
  description: "A Malta-based online catalog for quality electronics, devices, and everyday tech essentials.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  socials: {
    instagram: "https://www.instagram.com/dl_gadgetsmt?igsh=MXg0Zjg5ODJscDh2YQ%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/share/1NSwGGNxgS/?mibextid=wwXIfr",
  },
};

export function whatsappLink(text = "Hello DL Gadgets, I would like to make an enquiry.") {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : "/contact";
}
