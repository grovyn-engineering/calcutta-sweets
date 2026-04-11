"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const stats = [
  {
    value: "Since 2000",
    label: "HERITAGE ESTABLISHED",
  },
  {
    value: "100% Natural",
    label: "NO PRESERVATIVES",
  },
  {
    value: "Loved by Generations",
    label: "AUTHENTIC TASTE",
  },
];

export default function StoreStats() {
  return (
    <section className="w-full bg-[#FAF5F0] border-y border-[#3E2B1E]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 text-center md:divide-x divide-[#3E2B1E]/10"
        >
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`flex flex-col items-center gap-2 py-8 md:py-0
                ${idx !== 0 ? 'border-t border-[#3E2B1E]/10 md:border-t-0' : ''}
                ${idx === 0 ? 'pt-0 md:py-0' : ''}
                ${idx === stats.length - 1 ? 'pb-0 md:py-0' : ''}
              `}
            >
              <h3 className="font-dm-serif text-2xl sm:text-3xl text-[#3E2B1E]">
                {s.value}
              </h3>
              <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A4F44]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}