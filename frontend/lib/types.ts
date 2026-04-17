export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string | null;
  category: string | null;
  imageUrl: string | null;
  isActive: boolean;
  isSignature?: boolean;
  costPrice?: number | null;
  barcode?: string | null;
  sku?: string | null;
  quantity?: number;
  minStock?: number | null;
  shopCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
