"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import Authenticity from "@/components/menu/Authenticity";
import SpecialOffers from "@/components/menu/SpecialOffers";
import CateringCTA from "@/components/menu/CateringCTA";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/lib/types";

const categories = ["All category", "Chena", "Fried", "Dessert", "Baked", "Signatures"];

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All category";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with a real API call when the backend is ready.
    getAllProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredItems =
    activeCategory === "All category"
      ? products
      : activeCategory === "Signatures"
      ? products.filter((item) => item.isSignature)
      : products.filter((item) => item.category === activeCategory);

  return (
    <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-20">
      {/* Header Section */}
      <section className="text-center mb-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-[120px] sm:-translate-x-[200px] -translate-y-4 opacity-60 pointer-events-none select-none hidden sm:block">
          <span className="text-3xl sm:text-5xl">.</span>
        </div>
        <div className="absolute top-0 left-1/2 translate-x-[80px] sm:translate-x-[140px] -translate-y-4 opacity-60 pointer-events-none select-none hidden sm:block">
          <span className="text-3xl sm:text-5xl">.</span>
        </div>

        <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-900 mb-2">
          Menu
        </h1>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-zinc-900 text-white shadow-md"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:shadow-sm"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-sans text-zinc-400 text-lg">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                description={item.description ?? ""}
                price={item.price}
                weight={item.unit ?? "200g"}
                image={item.imageUrl ?? "/images/sweet5.png"}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-zinc-400 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Focusing on Authenticity */}
      <Authenticity />

      {/* Special Offers */}
      <SpecialOffers />

      {/* Planning a Wedding / Catering CTA */}
      <CateringCTA />
    </main>
  );
}
