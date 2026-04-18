"use client";

import { useCallback, useEffect, useState } from "react";
import SignaturesClient from "./SignaturesClient";
import SignaturesSkeleton from "./SignaturesSkeleton";
import { mapSignatureToProduct } from "@/lib/mapSignatureSweet";
import type { Product } from "@/lib/types";

const SECTION_CLASS =
  "w-full bg-[#FEF7F2] py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24";

async function fetchSignatureProducts(): Promise<Product[]> {
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch(`${base}/signature-sweets`, {
      cache: "no-store",
      signal: controller.signal,
    });
    const json = (await res.json()) as {
      success?: boolean;
      data?: unknown;
      message?: string;
    };

    if (!res.ok || !json || json.success !== true || !Array.isArray(json.data)) {
      throw new Error(
        typeof json.message === "string" ? json.message : `Request failed (${res.status})`
      );
    }

    return json.data.map((row, i) =>
      mapSignatureToProduct(row as Record<string, unknown>, i)
    );
  } finally {
    clearTimeout(t);
  }
}

export default function Signatures() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchSignatureProducts();
      setProducts(list);
    } catch (e) {
      setProducts([]);
      setError(e instanceof Error ? e.message : "Could not load signature sweets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <SignaturesSkeleton />;
  }

  return (
    <section className={SECTION_CLASS}>
      {error ? (
        <div className="max-w-[1400px] mx-auto mb-6 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium">Featured sweets could not be loaded from the server.</p>
          <p className="mt-1 text-amber-900/80">{error}</p>
        </div>
      ) : null}
      <SignaturesClient products={products ?? []} loadError={Boolean(error)} />
    </section>
  );
}
