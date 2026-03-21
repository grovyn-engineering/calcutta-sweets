/**
 * Product type definition — mirrors the Prisma `Product` model.
 *
 * When the backend is connected, this interface should stay in sync
 * with the Prisma-generated types (or be replaced by them entirely).
 */
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  costPrice: number | null;
  barcode: string;
  sku: string | null;
  quantity: number;
  minStock: number | null;
  unit: string | null;
  category: string | null;
  imageUrl: string | null;
  isActive: boolean;
  isSignature?: boolean;
  shopCode: string;
  createdAt: Date;
  updatedAt: Date;
}
