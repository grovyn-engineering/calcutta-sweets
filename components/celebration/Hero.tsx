"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

/**
 * Celebration Hero component highlights the brand's premium catering and 
 * bulk order services, utilizing a refined split-screen layout with 
 * a dynamic image showcase.
 */
export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FEF5ED] min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Descriptive content: Framing the artisanal value for special occasions */}
        <motion.div {...fadeUp}>
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#AF7B34] mb-6 block">
            BULK & CUSTOM ORDERS
          </span>
          <h1 className="font-dm-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#342114] leading-[1.1] mb-6">
            Sweeten Every
            <br />
            <span className="text-[#CF7B38]">Celebration.</span>
          </h1>
          <p className="font-sans text-[#5A4D40] text-base sm:text-[17px] leading-[1.8] max-w-[480px] mb-10">
            From artisanal Mishti boxes to grand wedding platters, bring the authentic heritage of Bengal to your most cherished moments. Crafted by hand, delivered with lots of love and care.
          </p>
          
          {/* Action triggers: Direct pathways to curation and enquiry */}
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/menu" className="px-9 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm active:scale-95">
              Curate Your Order
            </Link>
            <a href="tel:+919876543210" className="px-9 py-3.5 rounded-full border border-[#BBAA9A] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors active:scale-95">
              Call to Enquire
            </a>
          </div>
        </motion.div>

        {/* Multi-asset visual showcase: Highlighting the diversity of the artisanal collection */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-2 gap-4"
        >
          {/* Individually staggered image cards with subtle interactvity */}
          {[
            { src: "/images/sweet2.jpg", alt: "Traditional mishti selection" },
            { src: "/images/sweet3.jpg", alt: "Freshly prepared sweets" },
            { src: "/images/sweet4.jpg", alt: "Artisanal preparation detail" },
            { src: "/images/sweet5.jpg", alt: "Premium packaging" },
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              whileHover={hoverScale}
              className="relative aspect-square overflow-hidden bg-zinc-100 rounded-lg shadow-sm group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
