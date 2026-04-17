"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Authenticity from "@/components/menu/Authenticity";
import SpecialOffers from "@/components/menu/SpecialOffers";
import CateringCTA from "@/components/menu/CateringCTA";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/lib/types";

const ALL_LABEL = "All category";
const SIGNATURES_LABEL = "Signatures";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || ALL_LABEL;

  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoadError(null);
    getAllProducts()
      .then(setProducts)
      .catch((e: Error) => setLoadError(e.message || "Could not load menu"))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(() => {
    const fromDb = new Set<string>();
    for (const p of products) {
      if (p.category?.trim()) fromDb.add(p.category.trim());
    }
    const sorted = [...fromDb].sort((a, b) => a.localeCompare(b));
    const hasSignatures = products.some((p) => p.isSignature);
    const tabs = [ALL_LABEL, ...sorted];
    if (hasSignatures) tabs.push(SIGNATURES_LABEL);
    return tabs;
  }, [products]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] ?? ALL_LABEL);
    }
  }, [categories, activeCategory]);

  const filteredItems =
    activeCategory === ALL_LABEL
      ? products
      : activeCategory === SIGNATURES_LABEL
        ? products.filter((item) => item.isSignature)
        : products.filter((item) => item.category === activeCategory);

  return (
    <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-20">

      <section className="text-center mb-12 relative">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-[#9B6E2C]/80 to-[#9B6E2C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#9B6E2C]" />
            <div className="w-2 h-2 rounded-full bg-[#9B6E2C]" />
          </div>

          <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#3E2F26] whitespace-nowrap">
            Menu
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9B6E2C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#9B6E2C]" />
            <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-[#9B6E2C]/80 to-[#9B6E2C]" />
          </div>

        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-[#5D4037] text-white shadow-md"
                : "bg-white text-[#3E2F26] border border-zinc-200 hover:border-zinc-400 hover:shadow-sm"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-sans text-zinc-400 text-lg">
              Loading products...
            </p>
          </div>
        ) : loadError ? (
          <div className="text-center py-20 px-4">
            <p className="font-sans text-red-600/90 text-sm max-w-md mx-auto">
              {loadError}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.slice(0, showAll ? undefined : 6).map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                description={item.description ?? ""}
                price={item.price}
                weight={item.unit ?? "200g"}
                image={item.imageUrl ?? "/images/sweet5.png"}
                href={`/menu/${item.id}`}
              />
            ))}
          </div>
        )}

        {!isLoading && !loadError && filteredItems.length > 6 && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#5D4037] font-sans font-semibold hover:opacity-80 transition-all duration-300 flex items-center gap-1 group"
            >
              {showAll ? "View Less" : "View More"}
              {showAll ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        {!isLoading && !loadError && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-zinc-400 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </section>

      <Authenticity />
      <SpecialOffers />
      <CateringCTA />

    </main>
  );
}
