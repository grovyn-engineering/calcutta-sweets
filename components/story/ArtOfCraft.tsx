"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Sequential steps of the traditional manufacturing process.
 */
const steps = [
  {
    icon: "🌅",
    title: "The Morning Curd",
    description:
      "Each dawn, we receive fresh, full-cream curd-whole milk, split by hand to create the purest Chenna (curd) in Bengal.",
  },
  {
    icon: "🤲",
    title: "The Rhythmic Knead",
    description:
      "Our master confectioners use the warmth of their palms to mould and refine. Rhythm is key. Machine mixing cannot replicate this.",
  },
  {
    icon: "🍃",
    title: "The Gentle Poach",
    description:
      "Each sphere is gently lowered in precisely timed oil or syrup till perfection. The precision that gives our confections their hallmark lightness.",
  },
];

/**
 * ArtOfCraft component details the artisanal process of sweet making,
 * combining visual storytelling with a step-by-step narrative.
 */
export default function ArtOfCraft() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Visual representation of the craft with subtle entrance scale */}
        <motion.div 
          {...fadeUp}
          className="w-full lg:w-[45%] relative aspect-[3/2] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] shrink-0 group"
        >
          <Image
            src="/images/ingredients.png"
            alt="Hand-kneaded sweet preparation"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>

        {/* Narrative content explaining the "Hand-Kneaded" philosophy */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          
          {/* Section introduction and high-level focus */}
          <motion.div 
            {...fadeUp}
            className="flex flex-col gap-3"
          >
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A6A5A]">
              How We Make It
            </span>
            <h2 className="font-dm-serif text-[2.5rem] sm:text-[3rem] lg:text-[3.2rem] leading-[1.1] text-[#1A110A]">
              The Art of Hand-Kneaded
              <br />
              Perfection
            </h2>
          </motion.div>

          {/* Staggered process steps showing the sequential journey of the craft */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={staggerContainer.viewport}
            className="flex flex-col mt-4"
          >
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="flex gap-7 sm:gap-9"
              >
                {/* Visual timeline indicator with numeric step count */}
                <div className="flex flex-col items-center">
                  <div className="shrink-0 w-11 h-11 bg-white rounded-full border-[2px] border-[#A87948] flex items-center justify-center shadow-sm z-10 transition-colors group-hover:bg-[#A87948] group-hover:text-white">
                    <span className="text-[#A87948] font-sans font-bold text-sm sm:text-base tracking-widest ml-px">
                      0{i + 1}
                    </span>
                  </div>
                  {/* Decorative vertical thread connecting the steps */}
                  {i !== steps.length - 1 && (
                    <div className="w-[2px] flex-grow bg-[#E8DCD0] my-1" />
                  )}
                </div>

                {/* Detailed descriptions for each phase of the production */}
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
