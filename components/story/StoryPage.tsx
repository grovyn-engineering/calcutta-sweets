"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import ArtOfCraft from "@/components/story/ArtOfCraft";
import Timeline from "@/components/story/Timeline";
import Family from "@/components/story/Family";
import Quote from "@/components/story/Quote";
import GiftCTA from "@/components/story/GiftCTA";

/**
 * Configuration for the masonry-style image grid in the Story hero section.
 */
const heroGridItems = [
  { colSpan: "col-span-1", rowSpan: "row-span-2", src: "/images/sweet.jpg", title: "Cham Cham", subTitle: "Freshly Crafted Bengali", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet3.jpg", title: "Roshogolla", subTitle: "Classic Sweet", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet2.jpg", title: "Assorted Sweets", subTitle: "Festive Joy", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/malpua.png", title: "Malpua", subTitle: "Traditional Delight", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet5.jpg", title: "Payesh", subTitle: "Creamy Treat", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-2", src: "/images/sweet7.jpg", title: "Cham Cham", subTitle: "Freshly Crafted Bengali", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet6.jpg", title: "Roshogolla", subTitle: "Classic Sweet", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet4.jpg", title: "Assorted Sweets", subTitle: "Festive Joy", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet8.jpg", title: "Malpua", subTitle: "Traditional Delight", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet9.jpg", title: "Payesh", subTitle: "Creamy Treats", delivery: "Delivery" },
];

/**
 * StoryPage component serves as the main entry point for the "Our Story" page,
 * assembling the hero, timeline, family history, and call-to-action sections.
 */
export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#FEF7F2] overflow-x-hidden">
      
      {/* Narrative hero section with high-impact typography and image grid */}
      <section className="relative w-full min-h-[80vh] flex items-center px-6 sm:px-10 pt-24 pb-12 lg:pt-32 lg:pb-20 lg:px-16 xl:px-24">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Core brand headline and introduction */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center gap-6 max-w-xl w-full lg:w-[45%] shrink-0"
          >
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#9A6B29]">
              Calcutta Sweets
            </span>

            <h1 className="font-dm-serif text-[4rem] sm:text-[5rem] lg:text-[5.5rem] text-[#2C1D13] leading-[1.05] tracking-tight">
              A Recipe
              <br />
              Older
              <br />
              Than Raipur
            </h1>

            <p className="font-sans text-base sm:text-[17px] text-[#5A4D40] leading-[1.8] max-w-md mb-2">
              Crafting the sacred proportions of Mishti requires more than
              patience. It demands a lineage of hands that understand the precise
              moment when milk turns to magic.
            </p>

            {/* Navigation triggers for menu and visit information */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] hover:-translate-y-0.5 transition-all shadow-sm"
              >
                Explore Our Menu
              </Link>
              <Link
                href="/visit-us"
                className="inline-flex items-center px-8 py-3.5 rounded-full border border-[#D4C8BC] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] hover:-translate-y-0.5 transition-all"
              >
                Visit Us
              </Link>
            </div>
          </motion.div>

          {/* Complex masonry grid displaying various signature products */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
            className="w-full lg:w-[55%] grid grid-cols-3 grid-rows-4 gap-3 lg:gap-4 h-[500px] sm:h-[600px] lg:h-[600px]"
          >
            {heroGridItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative ${item.colSpan} ${item.rowSpan} rounded-2xl lg:rounded-3xl overflow-hidden group shadow-sm`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />

                {/* Sub-content revealed upon interaction */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 inset-x-0 p-4 lg:p-5 flex flex-col gap-1 items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between w-full">
                    <p className="font-dm-serif text-white text-lg lg:text-xl leading-tight">{item.title}</p>
                    <span className="text-white text-xs opacity-70">&gt;</span>
                  </div>
                  <p className="font-sans text-white/70 text-[10px] lg:text-[11px] leading-snug">{item.subTitle}</p>
                  <p className="font-sans text-white/50 text-[9px] lg:text-[10px]">{item.delivery}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship focus section */}
      <ArtOfCraft />

      {/* Historical timeline of the brand */}
      <Timeline />

      {/* Behind the scenes: family and team */}
      <Family />

      {/* Foundational philosophy and quotes */}
      <Quote />

      {/* Contextual call-to-action for gifting */}
      <GiftCTA />

    </main>
  );
}
