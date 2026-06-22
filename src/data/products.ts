import type { Category, CategoryName, Product } from "@/types";

const details: Record<CategoryName, Omit<Category, "title">> = {
  Smartphones: { slug: "smartphones", description: "Reliable phones for work, life, and everything in between.", featured: true },
  Tablets: { slug: "tablets", description: "Portable screens made for learning, entertainment, and productivity.", featured: true },
  "Gaming Devices": { slug: "gaming-devices", description: "Classic and portable gaming, ready for a new player.", featured: true },
  "Security Cameras": { slug: "security-cameras", description: "Practical home monitoring and smart security essentials.", featured: true },
  Accessories: { slug: "accessories", description: "The practical extras that keep your devices moving." },
  "Smart Devices": { slug: "smart-devices", description: "Connected tech for a more convenient everyday." },
  "Enterprise Devices": { slug: "enterprise-devices", description: "Purpose-built mobile technology for business teams." },
  "Clearance / Used Devices": { slug: "clearance-used-devices", description: "Quality-checked used and clearance tech with great value." },
};

export const categories: Category[] = (Object.keys(details) as CategoryName[]).map((title) => ({ title, ...details[title] }));

type Row = [string, CategoryName, string, number | null, string?, string?];
const rows: Row[] = [
  ["Samsung T540 Galaxy Tab Active Pro 10.1", "Tablets", "Samsung", null], ["Lenovo TB330FU Tab M11", "Tablets", "Lenovo", null],
  ["Lenovo TB125FU M10 Plus 3rd Gen", "Tablets", "Lenovo", null], ["Samsung T397 Galaxy Tab Active2", "Tablets", "Samsung", null],
  ["Motorola XT2027 One Hyper", "Smartphones", "Motorola", null], ["Samsung P900 Galaxy Note Pro 12.2", "Tablets", "Samsung", null],
  ["Samsung T807 Galaxy Tab S", "Tablets", "Samsung", null], ["Samsung T800 Galaxy Tab S", "Tablets", "Samsung", null],
  ["Samsung T320 Galaxy Tab Pro 8.4", "Tablets", "Samsung", null], ["Samsung T900 Galaxy Tab Pro", "Tablets", "Samsung", null],
  ["Lenovo YT-X703F Yoga Tab 3 Plus", "Tablets", "Lenovo", null], ["Samsung G870 Galaxy S5 Active", "Smartphones", "Samsung", null],
  ["Samsung G900T Galaxy S5", "Smartphones", "Samsung", null], ["Samsung G900P Galaxy S5", "Smartphones", "Samsung", null],
  ["Lenovo 801LV Tab 5", "Tablets", "Lenovo", null], ["Lenovo TB-X606F M10 Tab", "Tablets", "Lenovo", null],
  ["Lenovo TB-X605 Smart Tab M10", "Tablets", "Lenovo", null], ["Lenovo TB-X505F Tab M10", "Tablets", "Lenovo", null],
  ["Samsung T380 / T385 Galaxy Tab A", "Tablets", "Samsung", null], ["Samsung T280 / T285 Galaxy Tab A", "Tablets", "Samsung", null],
  ["Samsung T530 Galaxy Tab 4", "Tablets", "Samsung", null], ["Motorola XT1922 G6 Play", "Smartphones", "Motorola", null],
  ["Samsung J337 Galaxy J3", "Smartphones", "Samsung", null], ["Samsung J327 Galaxy J3", "Smartphones", "Samsung", null],
  ["Samsung J320V Galaxy J3", "Smartphones", "Samsung", null], ["Samsung J320A Galaxy J3", "Smartphones", "Samsung", null],
  ["Lenovo TB300FU Tab M8", "Tablets", "Lenovo", null], ["Lenovo TB-X304F", "Tablets", "Lenovo", null],
  ["Lenovo TB-X103 Tab 10", "Tablets", "Lenovo", null], ["Lenovo TB-8504 Tab 4", "Tablets", "Lenovo", null],
  ["LG V410 G Pad 7.0 AT&T", "Tablets", "LG", null], ["LG V480 Pad F", "Tablets", "LG", null],
  ["Lenovo YT3-X50F Yoga Tab 3", "Tablets", "Lenovo", null], ["Huawei AGS-L03 MediaPad T3 10", "Tablets", "Huawei", null],
  ["Asus A006 / V520KL Zenfone V", "Smartphones", "Asus", null], ["Huawei BAC-L21 / BAC-L22 / BAC-AL00 Nova 2 Plus", "Smartphones", "Huawei", null],
  ["Huawei MLA-L03 Nova Plus", "Smartphones", "Huawei", null], ["Huawei KIW-L24 Honor 5X", "Smartphones", "Huawei", null],
  ["LG VS501 K20", "Smartphones", "LG", null], ["LG K300 Phoenix 5", "Smartphones", "LG", null], ["LG X210 K7", "Smartphones", "LG", null],
  ["LG X220 K5", "Smartphones", "LG", null], ["LG LML212VL", "Smartphones", "LG", null], ["LG L322", "Smartphones", "LG", null],
  ["Huawei MRD-LX3 / MRD-LX1 Y6 (2019)", "Smartphones", "Huawei", null], ["Aeezo C107 Tab", "Tablets", "Aeezo", null],
  ["Nintendo Switch Lite", "Gaming Devices", "Nintendo", null], ["Nintendo 3DS XL", "Gaming Devices", "Nintendo", null],
  ["Nintendo 3DS", "Gaming Devices", "Nintendo", null], ["Lenovo IdeaPad Duet 5 Chromebook", "Tablets", "Lenovo", null],
  ["onn. Tab Pro (2024)", "Tablets", "onn.", null], ["Lenovo 10e Chromebook Tablet", "Tablets", "Lenovo", null],
  ["Amazon Fire HD 10", "Tablets", "Amazon", null], ["Nintendo DSi", "Gaming Devices", "Nintendo", null],
  ["Nintendo DS Lite", "Gaming Devices", "Nintendo", null], ["Nintendo Game Boy Advance", "Gaming Devices", "Nintendo", null],
  ["Samsung Nexus 10", "Tablets", "Samsung", null], ["Lenovo Yoga Tab 2 Pro", "Tablets", "Lenovo", null],
  ["Samsung Galaxy S7 Edge", "Smartphones", "Samsung", null], ["Samsung Galaxy A5", "Smartphones", "Samsung", null],
  ["Huawei Nexus 6P", "Smartphones", "Huawei", null], ["ZTE Axon 7 Mini", "Smartphones", "ZTE", null],
  ["Lenovo Vibe K4 Note", "Smartphones", "Lenovo", null], ["ZTE Blade Z Max", "Smartphones", "ZTE", null],
  ["ZTE Blade X Max", "Smartphones", "ZTE", null], ["ZTE Zmax Pro", "Smartphones", "ZTE", null], ["ZTE Max XL", "Smartphones", "ZTE", null],
  ["LG G Pad F2", "Tablets", "LG", null], ["Samsung Galaxy Tab 3", "Tablets", "Samsung", null],
  ["LG Tribute HD", "Smartphones", "LG", null], ["TCL Flip 3", "Smartphones", "TCL", null],
  ["Zebra ET50 / ET55 Enterprise Tablet", "Enterprise Devices", "Zebra", null], ["Zebra TC510 Mobile Computer", "Enterprise Devices", "Zebra", null],
  ["Motorola Moto E13", "Smartphones", "Motorola", 1], ["Samsung Galaxy A50", "Smartphones", "Samsung", 3],
  ["Samsung Galaxy A20", "Smartphones", "Samsung", 1], ["Samsung Galaxy A01", "Smartphones", "Samsung", 21],
  ["Samsung Galaxy A10e", "Smartphones", "Samsung", 1],
  ["3MP Wireless Wi-Fi Security Camera", "Security Cameras", "Generic", 50, "New With Retail Box", "3MP wireless security camera with motion detection, colour night vision, two-way audio, app control, alerts, and remote monitoring."],
  ["Apple iPhone XS Max", "Smartphones", "Apple", 8], ["Apple iPhone XS", "Smartphones", "Apple", 2],
  ["Apple iPhone X", "Smartphones", "Apple", 25], ["Apple iPhone XR", "Smartphones", "Apple", 6],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const categoryImages: Record<CategoryName, string> = {
  Smartphones: "/products/smartphone-studio.webp",
  Tablets: "/placeholders/tablet.webp",
  "Gaming Devices": "/placeholders/gaming.webp",
  "Security Cameras": "/placeholders/security-camera.webp",
  Accessories: "/placeholders/accessory.webp",
  "Smart Devices": "/placeholders/accessory.webp",
  "Enterprise Devices": "/placeholders/enterprise-device.webp",
  "Clearance / Used Devices": "/placeholders/smartphone.webp",
};

export const products: Product[] = rows.map(([title, category, brand, quantity, condition, description], index) => ({
  id: `dlg-${String(index + 1).padStart(3, "0")}`,
  title,
  slug: slugify(title),
  brand,
  category,
  quantity,
  condition: condition || "Used / Refurbished",
  requestPrice: true,
  shortDescription: `${condition || "Quality-checked used / refurbished"} ${category.toLowerCase().replace(" / ", " ")} from ${brand}. Request current pricing and availability.`,
  description,
  image: categoryImages[category],
  featured: [0, 4, 46, 68, 75, 77, 78, 79, 80].includes(index),
  inStock: quantity !== 0,
  tags: [brand, category, condition || "Used / Refurbished"],
}));

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
