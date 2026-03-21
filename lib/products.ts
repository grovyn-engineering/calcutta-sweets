import { Product } from "./types";

// =============================================================================
// MOCK DATA
// =============================================================================
// TODO: Replace this entire file with real API calls once the backend is ready.
//       The function signatures should remain the same — only the bodies change.
// =============================================================================

/**
 * Simulates network latency. Remove when switching to real API calls.
 */
const delay = (ms: number = 200): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock product catalogue for Calcutta Sweets.
 * Each entry mirrors the Prisma `Product` model.
 */
export const mockProducts: Product[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567801",
    name: "Royal Rasmalai",
    description:
      "Soft chenna patties immersed in thickened, sweetened saffron-infused milk with pistachios.",
    price: 280,
    costPrice: 150,
    barcode: "8901234560001",
    sku: "CS-CHN-001",
    quantity: 45,
    minStock: 10,
    unit: "200g",
    category: "Chena",
    imageUrl: "/images/sweet.jpg",
    isActive: true,
    isSignature: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-01-15T10:30:00Z"),
    updatedAt: new Date("2026-03-01T08:00:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567802",
    name: "Spongy Roshogolla",
    description:
      "The pride of Bengal. Soft, spongy cheese balls soaked in a clear, light sugary syrup.",
    price: 200,
    costPrice: 90,
    barcode: "8901234560002",
    sku: "CS-CHN-002",
    quantity: 120,
    minStock: 20,
    unit: "200g",
    category: "Chena",
    imageUrl: "/images/sweet2.jpg",
    isActive: true,
    isSignature: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-01-15T10:30:00Z"),
    updatedAt: new Date("2026-02-20T14:15:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567803",
    name: "Golden Gulab Jamun",
    description:
      "Deep-fried dumplings made of milk solids, dipped in rose-scented sugar syrup.",
    price: 180,
    costPrice: 80,
    barcode: "8901234560003",
    sku: "CS-FRD-001",
    quantity: 80,
    minStock: 15,
    unit: "200g",
    category: "Fried",
    imageUrl: "/images/sweet3.jpg",
    isActive: true,
    isSignature: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-02-01T09:00:00Z"),
    updatedAt: new Date("2026-03-10T11:30:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567804",
    name: "Bengali Malpua",
    description:
      "Traditional sweet pancakes, fried until golden and soaked in cardamom sugar syrup.",
    price: 150,
    costPrice: 65,
    barcode: "8901234560004",
    sku: "CS-FRD-002",
    quantity: 60,
    minStock: 10,
    unit: "200g",
    category: "Fried",
    imageUrl: "/images/sweet4.jpg",
    isActive: true,
    isSignature: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-02-10T08:45:00Z"),
    updatedAt: new Date("2026-03-05T16:00:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567805",
    name: "Mishti Doi",
    description:
      "Thick, creamy fermented sweet yogurt served in traditional clay pots.",
    price: 120,
    costPrice: 50,
    barcode: "8901234560005",
    sku: "CS-DST-001",
    quantity: 35,
    minStock: 8,
    unit: "pot",
    category: "Dessert",
    imageUrl: "/images/sweet5.jpg",
    isActive: true,
    isSignature: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-03-01T07:30:00Z"),
    updatedAt: new Date("2026-03-18T09:45:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567806",
    name: "Classic Sandesh",
    description:
      "Delicate, melt-in-your-mouth milk fudge made from fresh chenna and aromatic cardamom.",
    price: 250,
    costPrice: 120,
    barcode: "8901234560006",
    sku: "CS-CHN-003",
    quantity: 55,
    minStock: 10,
    unit: "200g",
    category: "Chena",
    imageUrl: "/images/sweet6.jpg",
    isActive: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-01-20T11:00:00Z"),
    updatedAt: new Date("2026-03-12T13:20:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567807",
    name: "Patishapta Crepe",
    description:
      "Thin rice-flour crepes filled with sweetened coconut and kheer, a winter delicacy.",
    price: 200,
    costPrice: 95,
    barcode: "8901234560007",
    sku: "CS-BKD-001",
    quantity: 25,
    minStock: 5,
    unit: "200g",
    category: "Baked",
    imageUrl: "/images/sweet7.jpg",
    isActive: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-04-05T10:00:00Z"),
    updatedAt: new Date("2026-03-15T17:30:00Z"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567808",
    name: "Nolen Gurer Payesh",
    description:
      "Aromatic rice pudding cooked with date-palm jaggery, a quintessential Bengali winter treat.",
    price: 180,
    costPrice: 85,
    barcode: "8901234560008",
    sku: "CS-DST-002",
    quantity: 30,
    minStock: 8,
    unit: "bowl",
    category: "Dessert",
    imageUrl: "/images/sweet8.jpg",
    isActive: true,
    shopCode: "CS-KOL-01",
    createdAt: new Date("2025-04-10T09:15:00Z"),
    updatedAt: new Date("2026-03-20T10:00:00Z"),
  },
];

// =============================================================================
// DATA ACCESS FUNCTIONS
// =============================================================================
// Each function below simulates an async API call with artificial delay.
// To switch to a real backend, replace the function body with a fetch() call
// while keeping the same signature and return type.
// =============================================================================

/** Fetch all products. */
export async function getAllProducts(): Promise<Product[]> {
  // TODO: Replace with — return fetch("/api/products").then(res => res.json());
  await delay();
  return mockProducts;
}

/** Fetch a single product by its ID. Returns `null` if not found. */
export async function getProductById(id: string): Promise<Product | null> {
  // TODO: Replace with — return fetch(`/api/products/${id}`).then(res => res.json());
  await delay();
  return mockProducts.find((p) => p.id === id) ?? null;
}

/** Fetch all products belonging to a specific category. */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // TODO: Replace with — return fetch(`/api/products?category=${category}`).then(res => res.json());
  await delay();
  return mockProducts.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}

/** Search products by name or description (case-insensitive). */
export async function searchProducts(query: string): Promise<Product[]> {
  // TODO: Replace with — return fetch(`/api/products?q=${query}`).then(res => res.json());
  await delay();
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
  );
}

/** Fetch only active (listed) products. */
export async function getActiveProducts(): Promise<Product[]> {
  // TODO: Replace with — return fetch("/api/products?active=true").then(res => res.json());
  await delay();
  return mockProducts.filter((p) => p.isActive);
}
