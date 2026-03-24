"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Key statistics and milestones for the brand journey.
 */
const stats = [
  { value: "EST 2000", label: "PIONEERING TRADITION" },
  { value: "40+ VARIETIES", label: "ARTISANAL RECIPES" },
  { value: "3 GENERATIONS", label: "FAMILY LEGACY" },
  { value: "CALCUTTA'S FINEST", label: "LOCAL FAVORITE" },
];

/**
 * OurStory component presenting the brand heritage through statistics and a narrative section.
 */
export default function OurStory() {
  return (
    <section className="w-full flex flex-col">
      {/* Brand legacy statistics banner with staggered entry animation */}
      <div 
        className="w-full py-10 px-6 flex justify-center items-center"
        style={{ background: "linear-gradient(to right, #3D2B1F, #241409)" }}
      >
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-0 lg:divide-x divide-white/10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className={`flex flex-col items-center justify-center py-8 px-4 text-center
                ${index % 2 !== 0 ? 'border-l border-white/10 lg:border-l-0' : ''}
                ${index >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''}
              `}
            >
              <span className="font-dm-serif text-3xl sm:text-2xl text-[#FAF3E8] mb-1">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#C8773A]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main narrative section featuring text storytelling and local imagery */}
      <div className="w-full bg-[var(--background)] py-24 px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Narrative text content: origin story and heritage focus */}
          <motion.div 
            {...fadeUp}
            className="flex-1 flex flex-col"
          >
            <h3 className="font-sans text-[#C8773A] font-bold tracking-[0.15em] mb-6 uppercase text-sm">
              Our Story
            </h3>
            
            <h2 className="font-dm-serif text-4xl lg:text-5xl text-[#3D2B1F] leading-[1.2] mb-8">
              A small counter in <br className="hidden lg:block"/>
              <span className="text-[#C8773A]">Tatibandh</span>, a Grandmother's <br className="hidden lg:block"/>
              recipe diary.
            </h2>
            
            <p className="font-sans text-zinc-600 text-lg leading-relaxed mb-10 max-w-xl">
              Three generations of recipes handed down through whispers and wooden spoons. What started as a humble stall in the heart of Raipur has grown into a destination for those who seek the authentic taste of Bengal.
            </p>
            
            {/* Primary actions: menu exploration and deep dive into heritage */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/story" className="px-8 py-3.5 rounded-full bg-[#C8773A] text-white font-sans font-medium text-sm hover:bg-[#b06832] hover:scale-105 active:scale-95 transition-all shadow-sm">
                Get the Recipe Book
              </Link>
              <Link href="/story" className="px-8 py-3.5 rounded-full border border-black/20 text-[#3D2B1F] font-sans font-medium text-sm hover:bg-black/5 hover:scale-105 active:scale-95 transition-all">
                Read Full Story
              </Link>
            </div>
          </motion.div>

          {/* Visual section: signature shop imagery with heritage founding badge */}
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.whileInView.transition, delay: 0.2 }}
            className="flex-1 relative w-full aspect-[4/3] lg:aspect-[5/4] max-w-2xl mx-auto"
          >
            {/* Floating establishment year badge with spring-based entrance */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", delay: 0.6 }}
              className="absolute -top-8 -left-8 lg:-top-12 lg:-left-12 z-20 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-[#C8773A] border-[6px] border-[var(--background)] shadow-xl flex flex-col items-center justify-center text-white"
            >
              <span className="font-sans text-[10px] uppercase tracking-widest font-medium opacity-90 mb-0.5">
                EST.
              </span>
              <span className="font-dm-serif text-2xl lg:text-3xl">
                2000
              </span>
            </motion.div>

            {/* Main sectional image with subtle interaction scale */}
            <div className="relative w-full h-full rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image 
                src="/images/shopInterior.png" 
                alt="Traditional sweets assortment on a brass plate"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
