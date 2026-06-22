export type CategoryName =
  | "Smartphones"
  | "Tablets"
  | "Gaming Devices"
  | "Security Cameras"
  | "Accessories"
  | "Smart Devices"
  | "Enterprise Devices"
  | "Clearance / Used Devices";

export type ProductCondition = "New" | "Used" | "Refurbished" | "Open Box" | "For Parts" | "Unknown" | string;
export type ProductStatus = "draft" | "active" | "hidden";

export type ProductSpec = {
  key: string;
  value: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: CategoryName;
  quantity: number | null;
  condition: ProductCondition;
  price?: number | null;
  salePrice?: number | null;
  currency?: string;
  requestPrice: boolean;
  shortDescription: string;
  description?: string;
  image?: string;
  images?: string[];
  specs?: ProductSpec[];
  featured: boolean;
  inStock: boolean;
  tags?: string[];
  status?: ProductStatus;
};

export type Category = {
  title: CategoryName;
  slug: string;
  description: string;
  image?: string;
  featured?: boolean;
  sortOrder?: number;
};
