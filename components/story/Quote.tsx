"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";


export default function Quote() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20 bg-[#FEF7F2]">
      <motion.div
        {...fadeUp}
        className="max-w-[900px] mx-auto text-center flex flex-col items-center"
      >
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block font-dm-serif text-[4rem] sm:text-[5rem] text-[#D2AC8D] leading-[0.5] mb-4 sm:mb-6 select-none"
        >
          ”
        </motion.span>

        <p className="font-dm-serif text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] text-[#1A110A] leading-[1.6] italic mb-6 sm:mb-8 tracking-wide">
          "We never scaled to grow faster; we only scaled to bring the authentic flavor of North Calcutta to a neighborhood that deserved it. In every bite, there is a piece of our childhood home."
        </p>
        <div className="w-16 h-[2px] bg-[#B08A63] mb-6" />
        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#6E645B]">
          The Founding Family
        </span>
      </motion.div>
    </section>
  );
}
