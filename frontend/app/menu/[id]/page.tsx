"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProductById(productId)
      .then((p) => {
        if (!cancelled) setProduct(p);
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message || "Could not load product");
          setProduct(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <p className="font-sans text-zinc-500 text-center py-24">Loading…</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-[#5A4D40]/80 hover:text-[#3E2F26] transition-colors mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Link>
        <p className="font-sans text-zinc-600 text-center py-16 max-w-md mx-auto">
          {error || "This item is not available."}
        </p>
      </main>
    );
  }

  const img = product.imageUrl ?? "/images/sweet5.png";

  return (
    <main className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-screen bg-white">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-[#5A4D40]/80 hover:text-[#3E2F26] transition-colors mb-8 sm:mb-10 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative aspect-square w-full max-w-xl mx-auto md:mx-0 rounded-3xl overflow-hidden bg-zinc-100 shadow-sm">
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center pt-2 md:pt-8">
          {product.isSignature ? (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B6E2C] mb-3">
              Signature
            </span>
          ) : null}
          <h1 className="font-dm-serif text-4xl sm:text-5xl text-[#3E2F26] mb-4 leading-tight">
            {product.name}
          </h1>
          {product.category ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              {product.category}
            </p>
          ) : null}
          <p className="font-sans text-zinc-600 text-base leading-relaxed mb-8 max-w-lg">
            {product.description || "A Calcutta Sweets favorite, made fresh in our kitchen."}
          </p>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-dm-serif text-3xl text-[#3E2F26]">₹{product.price}</span>
            <span className="font-sans text-sm text-zinc-500">/ {product.unit ?? "200g"}</span>
          </div>
          <Link
            href="/visit-us"
            className="mt-10 inline-flex w-fit rounded-full bg-[#5D4037] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#4a332c]"
          >
            Visit us to order
          </Link>
        </div>
      </div>
    </main>
  );
}
