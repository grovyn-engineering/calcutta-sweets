"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import FindUs from "@/components/visit-us/FindUs";
import StoreStats from "@/components/visit-us/StoreStats";
import WelcomeSection from "@/components/visit-us/WelcomeSection";

/**
 * Key visual and atmospheric features of the physical storefront experience.
 */
const storeFeatures = [
  {
    title: "The Golden Display",
    description:
      "An array of fresh Sandesh and Roshogolla, curated daily to perfection.",
    image: "/images/sweet2.jpg",
  },
  {
    title: "Artisanal Craft",
    description:
      "Every sweet is a masterpiece of texture and balance, crafted by experts.",
    image: "/images/sweet3.jpg",
  },
  {
    title: "Refined Atmosphere",
    description:
      "A serene space designed for the connoisseur who appreciates fine traditional taste.",
    image: "/images/shopInterior.png",
  },
];

/**
 * Visit Us Hero component serves as the primary gateway to the physical brand experience,
 * featuring a large-scale atmospheric hero and a staggered introduction to store highlights.
 */
export default function Hero() {
  return (
    <main className="min-h-screen bg-[#FAF3E8]">

      {/* Primary store entry: featuring a full-width atmospheric showcase */}
      <section className="px-4 md:px-8 lg:px-12 pt-28 pb-10">
    <div className="max-w-7xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-md group">

        {/* Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <Image
            src="/images/Shop.png"
            alt="Calcutta Sweets storefront"
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            className="w-full h-auto block"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-brand-brown/25 to-transparent" />
        </motion.div>

        {/* Overlay content */}
        <motion.div
          {...fadeUp}
          className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-8 sm:pb-12 md:pb-16"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">
            TATIBANDH, RAIPUR
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-4">
            Come Find Us.
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed">
            Come experience the smell of fresh cardamom and the taste of sweets made by hand. We have been part of the Tatibandh neighborhood since 2000, and we are proud to keep the tradition alive.
          </p>

          <div className="flex gap-3 flex-wrap">
            {/* Get Directions */}
            <a
              href="https://maps.google.com/?q=Calcutta+Sweets+Tatibandh+Raipur"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#B45309] text-white text-xs sm:text-sm font-medium hover:bg-[#9a3f07] transition shadow-sm active:scale-95"
            >
              Get Directions
            </a>

            {/* Call */}
            <a
              href="tel:+919993060082"
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/40 text-white text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-[#3E2F26] transition active:scale-95"
            >
              Call the Store
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>

      {/* Brand experience: Detailing unique store pillars with a staggered grid reveal */}
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-[#FAF3E8]">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#3E2F26] mb-4">
              Experience Authenticity
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] max-w-2xl mx-auto">
              Our store is more than a shop; it is an invitation to witness the
              heritage of Bengal. Breathe in the aroma of fresh cardamom and watch our karigars at work.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={staggerContainer.viewport}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {storeFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={hoverScale}
                className="rounded-2xl overflow-hidden bg-[#ffffff] border border-brand-brown/5 group cursor-pointer"
              >
                <div className="relative h-[260px] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-serif text-[#3E2F26] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-[#6F6F6F] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contextual mapping, operational metrics, and seasonal greetings */}
      <FindUs />
      <StoreStats />
      <WelcomeSection />
    </main>
  );
}