"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SignatureCard from "@/components/ui/SignatureCard";
import { Product } from "@/lib/types";

interface SignaturesClientProps {
  products: Product[];
}

/**
 * SignaturesClient component manages the animated display of the brand's premium items.
 * Uses a staggered grid layout and responsive header for a high-end feel.
 */
export default function SignaturesClient({ products }: SignaturesClientProps) {
  // Extract a subset of products for the featured signatures display
  const featuredSweets = products.slice(0, 5);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-10">

      {/* Hero-style section header with entry animation */}
      <motion.div 
        {...fadeUp}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-dm-serif text-[24px] sm:text-[36px] md:text-[44px] text-[#2C1D13] uppercase tracking-wider leading-none">
            THE SIGNATURES
          </h2>

          <Link
            href="/menu?category=Signatures"
            className="
              inline-flex items-center gap-1
              text-[11px] sm:text-sm
              px-3 py-1.5 sm:px-6 sm:py-2.5
              rounded-full 
              bg-[#F5E8DC] 
              text-[#4A3221] 
              font-sans font-semibold 
              hover:bg-[#E8D4C0] 
              transition-colors
              whitespace-nowrap
            "
          >
            View All <span className="text-sm sm:text-lg">→</span>
          </Link>
        </div>

        <span className="font-sans text-[#A86F46] font-medium text-[14px] sm:text-[15px]">
          Featured Collection
        </span>
      </motion.div>

      {/* Featured items grid with staggered entrance animations */}
      {featuredSweets.length > 0 && (
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 lg:h-[650px]"
        >
          {/* Main feature card spanning two rows on large displays */}
          {featuredSweets[0] && (
            <SignatureCard sweet={featuredSweets[0]} className="lg:row-span-2 h-[400px] lg:h-auto" />
          )}

          {/* Secondary feature cards in a masonry-style arrangement */}
          {featuredSweets[1] && (
            <SignatureCard sweet={featuredSweets[1]} className="h-[250px] lg:h-auto" />
          )}

          {featuredSweets[2] && (
            <SignatureCard sweet={featuredSweets[2]} className="h-[250px] lg:h-auto" />
          )}

          {featuredSweets[3] && (
            <SignatureCard sweet={featuredSweets[3]} className="h-[250px] lg:h-auto" />
          )}

          {featuredSweets[4] && (
            <SignatureCard sweet={featuredSweets[4]} className="h-[250px] lg:h-auto" />
          )}
        </motion.div>
      )}
    </div>
  );
}
