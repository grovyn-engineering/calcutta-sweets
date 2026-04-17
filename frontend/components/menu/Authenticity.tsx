"use client";

import Image from "next/image";
import { Leaf, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Authenticity() {
  return (
    <section className="py-28 px-6 md:px-12 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <motion.div
            {...fadeUp}
            className="flex justify-center md:justify-start pb-20 md:pb-0"
          >
            <div
              className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[340px] sm:h-[400px] md:h-[460px] overflow-visible shadow-xl mx-auto md:mx-0 shrink-0"
              style={{ borderRadius: "200px 200px 0 0" }}
            >
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "200px 200px 0 0" }}>
                <Image
                  src="/images/shopInterior.png"
                  alt="Traditional sweets preparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, 380px"
                />
                <div className="absolute inset-0 bg-brand-brown/20" />
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 20 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-14 right-[-40px] w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] md:w-[155px] md:h-[155px] rounded-full overflow-hidden border-[5px] border-[#F6F4F0] shadow-2xl"
              >
                <Image
                  src="/images/sweet6.jpg"
                  alt="Sweets detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 35vw, 155px"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex flex-col max-w-lg text-center md:text-left items-center md:items-start mt-8 md:mt-0">
            <motion.div {...fadeUp} className="flex flex-col items-center md:items-start">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B47B2A] font-semibold mb-6">
                Since 2000
              </span>

              <h2 className="text-[32px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#3E2F26] mb-6 font-serif">
                Focusing on <br /> Authenticity
              </h2>

              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-10">
                At Calcutta Sweets, we believe that the soul of a sweet lies in
                its ingredients. We source our milk from local farms and use
                traditional brass vessels to ensure that every batch retains the
                authentic flavor of Kolkata.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={staggerContainer.viewport}
              className="flex flex-col sm:flex-row gap-8 sm:gap-12"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-3 items-center md:items-start">
                <Leaf className="w-5 h-5 text-[#B47B2A]" />
                <span className="text-sm font-semibold text-[#3E2F26]">
                  Natural Ingredients
                </span>
                <p className="text-xs text-[#8A8A8A] max-w-[180px] leading-relaxed">
                  Pure cow milk and organic sweeteners only.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-3 items-center md:items-start">
                <ScrollText className="w-5 h-5 text-[#B47B2A]" />
                <span className="text-sm font-semibold text-[#3E2F26]">
                  Heritage Recipes
                </span>
                <p className="text-xs text-[#8A8A8A] max-w-[180px] leading-relaxed">
                  Passed down through generations of Karigars.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}