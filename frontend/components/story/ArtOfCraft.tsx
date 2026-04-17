"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { StoryCraftStep } from "@/hooks/useAdminData";

export default function ArtOfCraft({
  overline,
  headline,
  imageUrl,
  steps,
}: {
  overline: string;
  headline: string;
  imageUrl: string;
  steps: StoryCraftStep[];
}) {
  const headlineLines = headline.split(/\n/).map((t) => t.trim()).filter(Boolean);

  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        <motion.div
          {...fadeUp}
          className="w-full lg:w-[45%] relative aspect-[3/2] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] shrink-0 group"
        >
          <Image
            src={imageUrl}
            alt="Hand kneaded sweet preparation"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>

        <div className="w-full lg:w-[55%] flex flex-col gap-6">

          <motion.div
            {...fadeUp}
            className="flex flex-col gap-3"
          >
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A6A5A]">
              {overline}
            </span>
            <h2 className="font-dm-serif text-[2.5rem] sm:text-[3rem] lg:text-[3.2rem] leading-[1.1] text-[#1A110A]">
              {headlineLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headlineLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={staggerContainer.viewport}
            className="flex flex-col mt-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={`${step.title}-${i}`}
                variants={fadeUp}
                className="group flex gap-7 sm:gap-9"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="shrink-0 w-11 h-11 bg-white rounded-full border-[2px] border-[#A87948] flex items-center justify-center shadow-sm z-10 transition-colors group-hover:bg-[#A87948] group-hover:text-white"
                  >
                    {step.icon?.trim() ? (
                      <span className="text-lg leading-none" aria-hidden>
                        {step.icon.trim()}
                      </span>
                    ) : (
                      <span className="text-[#A87948] font-sans font-bold text-sm sm:text-base tracking-widest ml-px group-hover:text-white">
                        0{i + 1}
                      </span>
                    )}
                  </motion.div>
                  {i !== steps.length - 1 && (
                    <div className="w-[2px] flex-grow bg-[#E8DCD0] my-1" />
                  )}
                </div>
                <div className={`flex flex-col gap-1.5 pt-1.5 ${i !== steps.length - 1 ? "pb-8 lg:pb-10" : ""}`}>
                  <h3 className="font-sans font-bold text-[16px] xl:text-[17px] text-[#2C241E] leading-tight transition-colors hover:text-[#A87948]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] xl:text-[15px] text-[#6E645B] leading-[1.65] max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
