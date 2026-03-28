"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

/**
 * GiftCTA component provides a high-impact call to action for the brand's gifting services,
 * featuring a split-screen layout with narrative text and evocative imagery.
 */
export default function GiftCTA() {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
        
        {/* Narrative-driven call to action with a focus on heritage gifting */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#3A2D23] px-8 sm:px-16 md:px-24 py-12 lg:py-16 flex flex-col justify-center items-start"
        >
          <h2 className="font-dm-serif text-[2.5rem] sm:text-[3rem] lg:text-[4rem] text-white leading-[1.15] mb-4">
            Gift a Legacy of
            <br />
            Pure Refinement
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] text-[#A69B91] leading-[1.7] mb-8 max-w-[420px]">
            Our heritage boxes are designed to preserve both the temperature and
            the tradition of our finest selections.
          </p>
          {/* Link to the curated gifting collection in the menu */}
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#69421A] border border-[#8C6234] text-white font-sans text-[15px] font-bold hover:bg-[#523314] hover:-translate-y-1 transition-all shadow-sm active:scale-95"
          >
            Curate Your Box
          </Link>
        </motion.div>

        {/* Visual asset showcasing the artisanal packaging and product presentation */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[400px] lg:min-h-0 bg-[#DE9E62] group"
        >
          <Image
            src="/images/sweet4.jpg"
            alt="Heritage gift box"
            fill
            className="object-cover transition-transform duration-1000"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
