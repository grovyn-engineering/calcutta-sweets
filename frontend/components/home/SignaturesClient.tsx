"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SignatureCard from "@/components/ui/SignatureCard";
import { Product } from "@/lib/types";

interface SignaturesClientProps {
  products: Product[];
}

const FEATURED_COUNT = 5;

export default function SignaturesClient({ products }: SignaturesClientProps) {
  const featuredSweets = products.slice(0, FEATURED_COUNT);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8 sm:gap-10">

      <motion.div {...fadeUp} className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-dm-serif text-2xl sm:text-4xl md:text-[44px] text-[#2C1D13] uppercase tracking-wider leading-none">
            THE SIGNATURES
          </h2>

          <Link
            href="/menu?category=Signatures"
            className="inline-flex items-center gap-1 shrink-0 text-[11px] sm:text-sm px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#F5E8DC] text-[#4A3221] font-sans font-semibold hover:bg-[#E8D4C0] transition-colors whitespace-nowrap"
          >
            View All <span className="text-sm sm:text-lg">→</span>
          </Link>
        </div>

        <span className="font-sans text-[#A86F46] font-medium text-sm sm:text-[15px]">
          Featured Collection
        </span>
      </motion.div>

      {featuredSweets.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 lg:h-[650px]"
        >
          {featuredSweets[0] && (
            <SignatureCard
              sweet={featuredSweets[0]}
              className="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[320px] sm:h-[380px] lg:h-auto"
            />
          )}

          {featuredSweets.slice(1).map((sweet, i) => (
            <SignatureCard
              key={sweet.id ?? i}
              sweet={sweet}
              className="h-[220px] sm:h-[250px] lg:h-auto"
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}