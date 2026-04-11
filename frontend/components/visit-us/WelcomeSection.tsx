"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Map, Phone, Clock, ChevronRight } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="w-full bg-[#FAF5F0] px-4 md:px-8 lg:px-12 py-20 pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <motion.div
          {...fadeUp}
          className="flex flex-col"
        >
          <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2B1E] leading-[1.15] mb-8">
            We&apos;d Love to
            <br />
            Welcome You.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4F44] leading-relaxed max-w-md mb-12">
            Whether you are grabbing a box of Sandesh for a party or just dropping by for a morning Rosogolla, we are always here. We have been serving Raipur since 2000, and our doors are always open.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 relative shrink-0">
              <Image
                src="/images/chef3.jpg"
                alt="Aloke Bera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, 48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm text-[#3E2B1E]">
                Aloke Bera
              </span>
              <span className="font-sans text-xs text-[#5A4F44]">
                Owner, Calcutta Sweets
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="flex flex-col gap-6"
        >

          <motion.a
            variants={fadeUp}
            href="https://www.google.com/maps/dir/?api=1&destination=Calcutta+Sweets+Tatibandh+Raipur" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Map className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  FIND US AT
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  Tatibandh Square, Raipur
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            variants={fadeUp}
            href="tel:+919993060082" className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  CALL US
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  +91 99930 60082
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  OPEN DAILY
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  9:00 AM – 10:00 PM
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.div>

        </motion.div>


      </div>
    </section>
  );
}
