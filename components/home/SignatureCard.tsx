"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, hoverScale } from "@/lib/animations";
import { Product } from "@/lib/types";

interface SignatureCardProps {
  sweet: Product;
  className?: string;
}

/**
 * Individual signature sweet card with high-fidelity hover interactions and reveal overlays.
 */
export default function SignatureCard({ sweet, className }: SignatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={hoverScale}
      className={`relative w-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm block ${className}`}
    >
      <Link href={`/menu`} className="block w-full h-full relative">
        {/* Background product image with subtle scale transition */}
        <Image
          src={sweet.imageUrl || "/images/chamcham.png"}
          alt={sweet.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Informational overlay: reveals title and description on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1F110B]/95 via-[#1F110B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 sm:p-10 z-10">
          <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white">
                {sweet.name}
              </h3>
              <p className="font-sans text-[13px] text-white/80 max-w-[200px] leading-relaxed">
                {sweet.description || "Freshly Crafted Bengali Delicacy."}
              </p>
            </div>
            {/* Interactive indicator arrow */}
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-xl transition-colors hover:bg-white hover:text-black">
              ❯
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
