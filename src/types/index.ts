export type CategoryName =
  | "Smartphones"
  | "Tablets"
  | "Gaming Devices"
  | "Security Cameras"
  | "Accessories"
  | "Smart Devices"
  | "Enterprise Devices"
  | "Clearance / Used Devices";

export type Product = {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: CategoryName;
  quantity: number | null;
  condition: string;
  requestPrice: boolean;
  shortDescription: string;
  description?: string;
  image?: string;
  featured: boolean;
  inStock: boolean;
};

export type Category = {
  title: CategoryName;
  slug: string;
  description: string;
  featured?: boolean;
};
