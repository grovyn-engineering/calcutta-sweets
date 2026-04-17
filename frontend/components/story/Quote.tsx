"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function Quote({
  quoteText,
  attribution,
}: {
  quoteText: string;
  attribution: string;
}) {
  if (!quoteText.trim()) return null;

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
          aria-hidden
        >
          ”
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="font-dm-serif text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] text-[#1A110A] leading-[1.6] italic mb-6 sm:mb-8 tracking-wide"
        >
          &ldquo;{quoteText.trim()}&rdquo;
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="w-16 h-[2px] bg-[#B08A63] mb-6 origin-center"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#6E645B]"
        >
          {attribution.trim()}
        </motion.span>
      </motion.div>
    </section>
  );
}
