import type { Product } from "@/lib/types";

export function stableSignatureId(sweet: { id?: unknown; title?: unknown }, index: number) {
  if (sweet?.id != null && String(sweet.id).length > 0) return String(sweet.id);
  const raw = String(sweet?.title ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 96);
  return raw ? `sig-${raw}` : `sig-${index}`;
}

/** Maps API / admin shape or fallback demo shape into storefront Product fields. */
export function mapSignatureToProduct(sweet: Record<string, unknown>, index: number): Product {
  const hasName = typeof sweet.name === "string" && sweet.name.length > 0;
  const mapped = hasName
    ? { ...(sweet as unknown as Product), id: stableSignatureId(sweet, index) }
    : {
        id: stableSignatureId(sweet, index),
        name: String(sweet.title ?? "Untitled Sweet"),
        description: String(sweet.subTitle ?? ""),
        imageUrl: (sweet.imageUrl as string | null | undefined) ?? "/images/sweet.jpg",
        price: 0,
        unit: null,
        category: null,
        isActive: true,
      };

  return {
    ...mapped,
    price: mapped.price ?? 0,
    unit: mapped.unit ?? null,
    category: mapped.category ?? null,
    isActive: mapped.isActive !== false,
  };
}
