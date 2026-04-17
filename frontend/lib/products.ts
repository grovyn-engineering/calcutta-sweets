import { apiFetch } from "@/lib/api";
import { Product } from "./types";

function mapMenuRow(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    description: row.description != null ? String(row.description) : null,
    price: Number(row.price ?? 0),
    unit: row.unit != null ? String(row.unit) : "200g",
    category: row.category != null ? String(row.category) : null,
    imageUrl: row.imageUrl != null ? String(row.imageUrl) : null,
    isActive: row.isActive !== false,
    isSignature: Boolean(row.isSignature),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await apiFetch("/menu-products");
  if (!res.success || !Array.isArray(res.data)) {
    throw new Error(res.message || "Could not load menu");
  }
  return res.data.map(mapMenuRow);
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await apiFetch(`/menu-products/${encodeURIComponent(id)}`);
  if (!res.success) {
    if (res.message === "Not found") return null;
    throw new Error(res.message || "Could not load product");
  }
  return res.data ? mapMenuRow(res.data) : null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const all = await getAllProducts();
  const q = query.toLowerCase();
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false)
  );
}

export async function getActiveProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isActive);
}
