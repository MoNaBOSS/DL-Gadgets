import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export function isSanityConfigured() {
  return Boolean(projectId && dataset);
}

let readClient: ReturnType<typeof createClient> | undefined;
let writeClient: ReturnType<typeof createClient> | undefined;

export function getSanityClient() {
  if (!isSanityConfigured()) throw new Error("Sanity is not configured.");
  if (!readClient) {
    readClient = createClient({ projectId, dataset, apiVersion, useCdn: !process.env.SANITY_API_READ_TOKEN, token: process.env.SANITY_API_READ_TOKEN, perspective: "published" });
  }
  return readClient;
}

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!isSanityConfigured() || !token) return null;
  if (!writeClient) {
    writeClient = createClient({ projectId, dataset, apiVersion, useCdn: false, token, perspective: "published" });
  }
  return writeClient;
}
