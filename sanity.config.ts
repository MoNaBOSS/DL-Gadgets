"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schema";

export default defineConfig({
  name: "dl-gadgets",
  title: "DL Gadgets Admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "configure-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
