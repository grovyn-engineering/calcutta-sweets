import type { Metadata } from "next";
import ProductDetailView from "@/components/menu/ProductDetailView";
import { getProductById } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return {
        title: "Item Not Found | Calcutta Sweets Menu",
        description: "The requested sweet item could not be found.",
      };
    }
    const title = `${product.name} | Authentic Bengali Mithai`;
    const description =
      product.description ||
      `Buy handcrafted ${product.name} fresh from Calcutta Sweets in Raipur. Authentic Bengali recipe.`;
    const ogImage = product.imageUrl || "/images/Shop.png";

    return {
      title,
      description,
      alternates: {
        canonical: `/menu/${id}`,
      },
      openGraph: {
        title: `${product.name} | Calcutta Sweets`,
        description,
        url: `/menu/${id}`,
        images: [{ url: ogImage, alt: product.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Calcutta Sweets`,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "Artisanal Sweet Item | Calcutta Sweets",
      description: "Authentic Bengali Mithai handcrafted at Calcutta Sweets, Raipur.",
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductDetailView productId={id} />;
}
