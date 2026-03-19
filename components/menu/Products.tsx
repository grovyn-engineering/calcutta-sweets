"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Authenticity from "@/components/menu/Authenticity";
import SpecialOffers from "@/components/menu/SpecialOffers";
import CateringCTA from "@/components/menu/CateringCTA";

const categories = ["All category", "Chena", "Fried", "Dessert", "Baked"];

const menuItems = [
  {
    name: "Royal Rasmalai",
    description:
      "Soft Chenna patties immersed in thickened, sweetened saffron-infused milk.",
    price: 280,
    originalPrice: 350,
    weight: "200g",
    rating: 4.9,
    image: "/images/chamcham.png",
    category: "Chena",
  },
  {
    name: "Spongy Roshogolla",
    description:
      "The pride of Bengal. Soft, spongy cheese balls soaked in a clear, light sugary syrup.",
    price: 200,
    originalPrice: 300,
    weight: "200g",
    rating: 5.0,
    image: "/images/roshogulla.png",
    category: "Chena",
  },
  {
    name: "Golden Gulab Jamun",
    description:
      "Deep-fried dumplings made of milk solids, dipped in rose-scented sugar syrup.",
    price: 180,
    originalPrice: 250,
    weight: "200g",
    rating: 4.8,
    image: "/images/sandesh.png",
    category: "Fried",
  },
  {
    name: "Bengali Malpua",
    description:
      "Traditional sweet pancakes, fried until crisp and soaked in sugar syrup.",
    price: 150,
    originalPrice: 200,
    weight: "200g",
    rating: 4.9,
    image: "/images/malpua.png",
    category: "Fried",
  },
  {
    name: "Mishti Doi",
    description:
      "Thick, creamy fermented sweet yogurt served in traditional clay pots.",
    price: 120,
    originalPrice: 0,
    weight: "pot",
    rating: 5.0,
    image: "/images/chamcham.png",
    category: "Dessert",
  },
  {
    name: "Classic Sandesh",
    description:
      "Delicate, melt-in-your-mouth milk fudge made from fresh Chenna and aromatic cardamom.",
    price: 250,
    originalPrice: 350,
    weight: "200g",
    rating: 4.9,
    image: "/images/sandesh.png",
    category: "Chena",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All category");

  const filteredItems =
    activeCategory === "All category"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-20">
      {/* Header Section */}
      <section className="text-center mb-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-[120px] sm:-translate-x-[200px] -translate-y-4 opacity-60 pointer-events-none select-none hidden sm:block">
          <span className="text-3xl sm:text-5xl">🍬</span>
        </div>
        <div className="absolute top-0 left-1/2 translate-x-[80px] sm:translate-x-[140px] -translate-y-4 opacity-60 pointer-events-none select-none hidden sm:block">
          <span className="text-3xl sm:text-5xl">🍬</span>
        </div>

        <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-900 mb-2 italic">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <ProductCard
              key={`${item.name}-${index}`}
              name={item.name}
              description={item.description}
              price={item.price}
              originalPrice={item.originalPrice || undefined}
              weight={item.weight}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
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
