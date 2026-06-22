import { defineArrayMember, defineField, defineType } from "sanity";

const productConditions = ["New", "Used", "Refurbished", "Open Box", "For Parts", "Unknown"];

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", validation: (Rule) => Rule.integer().min(0) }),
  ],
  preview: { select: { title: "title", media: "image", subtitle: "description" } },
});

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().max(160) }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 120 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "condition", type: "string", options: { list: productConditions.map((value) => ({ title: value, value })), layout: "dropdown" }, initialValue: "Used" }),
    defineField({ name: "price", title: "Price (EUR)", type: "number", validation: (Rule) => Rule.min(0) }),
    defineField({ name: "currency", type: "string", initialValue: "EUR", validation: (Rule) => Rule.required().length(3).uppercase() }),
    defineField({ name: "requestPrice", title: "Request price instead of checkout", type: "boolean", initialValue: true }),
    defineField({ name: "salePrice", title: "Sale price (EUR)", type: "number", validation: (Rule) => Rule.min(0) }),
    defineField({ name: "quantity", type: "number", validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "inStock", title: "In stock", type: "boolean", initialValue: true }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (Rule) => Rule.max(300) }),
    defineField({ name: "description", title: "Full description", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "images", title: "Product images", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })], validation: (Rule) => Rule.max(8) }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "specs", title: "Specifications", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "key", title: "Label", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() })] })] }),
    defineField({ name: "status", type: "string", options: { list: ["draft", "active", "hidden"].map((value) => ({ title: value[0].toUpperCase() + value.slice(1), value })), layout: "radio" }, initialValue: "draft", validation: (Rule) => Rule.required() }),
    defineField({ name: "stripeProductId", title: "Stripe product ID", type: "string", readOnly: true }),
    defineField({ name: "stripePriceId", title: "Stripe price ID", type: "string", readOnly: true }),
  ],
  preview: { select: { title: "title", subtitle: "brand", media: "images.0" } },
});

export const orderSchema = defineType({
  name: "order",
  title: "Paid orders",
  type: "document",
  fields: [
    defineField({ name: "orderNumber", type: "string", validation: (Rule) => Rule.required(), readOnly: true }),
    defineField({ name: "stripeCheckoutSessionId", type: "string", validation: (Rule) => Rule.required(), readOnly: true }),
    defineField({ name: "stripePaymentIntentId", type: "string", readOnly: true }),
    defineField({ name: "customerName", type: "string", readOnly: true }),
    defineField({ name: "customerEmail", type: "string", readOnly: true }),
    defineField({ name: "customerPhone", type: "string", readOnly: true }),
    defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "productId", type: "string" }), defineField({ name: "title", type: "string" }), defineField({ name: "quantity", type: "number" }), defineField({ name: "unitAmount", type: "number" })] })], readOnly: true }),
    defineField({ name: "subtotal", type: "number", readOnly: true }),
    defineField({ name: "total", type: "number", readOnly: true }),
    defineField({ name: "currency", type: "string", readOnly: true }),
    defineField({ name: "paymentStatus", type: "string", readOnly: true }),
    defineField({ name: "orderStatus", type: "string", options: { list: ["paid", "processing", "fulfilled", "cancelled"] }, initialValue: "paid" }),
    defineField({ name: "createdAt", type: "datetime", readOnly: true }),
    defineField({ name: "notes", type: "text" }),
  ],
  preview: { select: { title: "orderNumber", subtitle: "customerEmail" } },
});

export const schemaTypes = [categorySchema, productSchema, orderSchema];
