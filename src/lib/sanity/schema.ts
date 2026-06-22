// Register these schema objects in a Sanity Studio when the CMS is enabled.
export const categorySchema = { name: "category", title: "Category", type: "document", fields: [
  { name: "title", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
  { name: "slug", type: "slug", options: { source: "title" } }, { name: "description", type: "text" },
  { name: "image", type: "image", options: { hotspot: true } }, { name: "featured", type: "boolean" },
] };
export const productSchema = { name: "product", title: "Product", type: "document", fields: [
  { name: "title", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
  { name: "slug", type: "slug", options: { source: "title" } }, { name: "category", type: "reference", to: [{ type: "category" }] },
  { name: "brand", type: "string" }, { name: "model", type: "string" }, { name: "condition", type: "string" },
  { name: "quantity", type: "number" }, { name: "price", type: "number" }, { name: "requestPrice", type: "boolean" },
  { name: "shortDescription", type: "text" }, { name: "description", type: "array", of: [{ type: "block" }] },
  { name: "images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }, { name: "featured", type: "boolean" }, { name: "inStock", type: "boolean" },
] };
