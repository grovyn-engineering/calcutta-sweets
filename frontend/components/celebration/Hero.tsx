"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import { useContactInfo, useHeroSlides } from "@/hooks/useAdminData";

// Hero section for the celebrations and catering page
export default function Hero() {
  const { data: slides, loading } = useHeroSlides();
  const { data: contactData } = useContactInfo();

  const hero = slides && slides.length > 0 ? slides[0] : null;

  const rawContact = Array.isArray(contactData) ? contactData[0] : contactData;
  const phone = rawContact?.phone || "+91 99930 60082";

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
        
        {/* Main headline and description content */}
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
          
          {/* CTAs for ordering and enquiries */}
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/menu" className="px-9 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm active:scale-95">
              Curate Your Order
            </Link>
            <a href={`tel:${phone}`} className="px-9 py-3.5 rounded-full border border-[#BBAA9A] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors active:scale-95">
              Call to Enquire
            </a>
          </div>
        </motion.div>

        {/* Interactive image grid for hero assets */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="flex flex-col gap-3"
        >
          <motion.div 
            variants={fadeUp}
            whileHover={hoverScale}
            className={`relative w-full h-[240px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}
          >
            <Image
              src={hero?.imageUrl || "/images/sweet8.jpg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
             <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
               <Image
                 src="/images/sweet5.jpg"
                 alt="Sweets"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 sizes="(max-width: 768px) 50vw, 25vw"
               />
             </div>
             <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
               <Image
                 src="/images/sweet6.jpg"
                 alt="Dessert"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 sizes="(max-width: 768px) 50vw, 25vw"
               />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
