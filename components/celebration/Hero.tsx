"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import { useHero } from "@/hooks/useHero";

/**
 * Celebration Hero component highlights the brand's premium catering and 
 * bulk order services, utilizing a refined split-screen layout with 
 * a dynamic image showcase.
 */
export default function Hero() {
  const { hero, loading } = useHero();

  // Fallback pattern if API data is not available or loading
  const title = hero?.title || "Sweeten Every Celebration.";
  const subtitle = hero?.subtitle || "From custom gift boxes to wedding platters, we help make your celebrations a bit sweeter. Everything is made by hand and delivered fresh to your door.";
  
  // Create stylized title (Splitting the last word to make it orange based on custom design rules)
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop();
  const restOfTitle = titleWords.join(" ");

  return (
    <section className="pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FEF5ED] min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Descriptive content: Framing the artisanal value for special occasions */}
        <motion.div {...fadeUp}>
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#AF7B34] mb-6 block">
            BULK & CUSTOM ORDERS
          </span>
          
          <h1 className="font-dm-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#342114] leading-[1.1] mb-6">
            <span className={`block opacity-100 transition-opacity duration-300 ${loading ? 'opacity-50' : ''}`}>
              {restOfTitle ? <>{restOfTitle}<br/></> : null}
              <span className="text-[#CF7B38]">{lastWord}</span>
            </span>
          </h1>

          <p className={`font-sans text-[#5A4D40] text-base sm:text-[17px] leading-[1.8] max-w-[480px] mb-10 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            {subtitle}
          </p>
          
          {/* Action triggers: Direct pathways to curation and enquiry */}
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/menu" className="px-9 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm active:scale-95">
              Curate Your Order
            </Link>
            <a href="tel:+919993060082" className="px-9 py-3.5 rounded-full border border-[#BBAA9A] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors active:scale-95">
              Call to Enquire
            </a>
          </div>
        </motion.div>

        {/* Multi-asset visual showcase */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 gap-4" /* Changed to grid-cols-1 to show the powerful dynamic image */
        >
           <motion.div 
              variants={fadeUp}
              whileHover={hoverScale}
              className={`relative aspect-[4/3] overflow-hidden bg-zinc-100 rounded-lg shadow-sm group cursor-pointer transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}
            >
              <Image
                src={hero?.imageUrl || "/images/sweet2.jpg"} // Fallback image logic
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
