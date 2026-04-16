"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import FindUs from "@/components/visit-us/FindUs";
import StoreStats from "@/components/visit-us/StoreStats";
import WelcomeSection from "@/components/visit-us/WelcomeSection";
import { useContactInfo } from "@/hooks/useAdminData";

const storeFeatures = [
  {
    title: "The Golden Display",
    description: "An array of fresh Sandesh and Roshogolla, curated daily to perfection.",
    image: "/images/sweet2.jpg",
  },
  {
    title: "Artisanal Craft",
    description: "Every sweet is a masterpiece of texture and balance, crafted by experts.",
    image: "/images/sweet3.jpg",
  },
  {
    title: "Refined Atmosphere",
    description: "A serene space designed for the connoisseur who appreciates fine traditional taste.",
    image: "/images/shopInterior.png",
  },
];

export default function Hero() {
  const { data } = useContactInfo();
  // Contact info may be returned as an array or a single object.
  const rawContact = Array.isArray(data) ? data[0] : data;
  const phone = rawContact?.phone || "+91 99930 60082";

  return (
    <main className="relative min-h-screen bg-[#FAF3E8]">
      <section className="px-4 md:px-8 lg:px-12 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full overflow-hidden rounded-md group">

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
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/30 to-transparent" />
            </motion.div>

            <motion.div
              {...fadeUp}
              className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 sm:px-10 md:px-16 pb-6 sm:pb-12 md:pb-16 pt-16 sm:pt-0"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-2 sm:mb-3">
                TATIBANDH, RAIPUR
              </span>

              <h1 className="text-2xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-2 sm:mb-4">
                Come Find Us.
              </h1>

              <p className="hidden sm:block text-xs sm:text-sm text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed">
                Come experience the smell of fresh cardamom and the taste of
                sweets made by hand. We have been part of the Tatibandh
                neighborhood since 2000, and we are proud to keep the tradition alive.
              </p>

              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <a
                  href="https://maps.google.com/?q=Calcutta+Sweets+Tatibandh+Raipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#B45309] text-white text-xs sm:text-sm font-medium hover:bg-[#9a3f07] transition shadow-sm active:scale-95"
                >
                  Get Directions
                </a>

                <a
                  href={`tel:${phone}`}
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/40 text-white text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-[#3E2F26] transition active:scale-95"
                >
                  Call the Store
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-[#FAF3E8]">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#3E2F26] mb-4">
              Experience Authenticity
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] max-w-2xl mx-auto">
              Our store is more than a shop; it is an invitation to witness the
              heritage of Bengal. Breathe in the aroma of fresh cardamom and
              watch our karigars at work.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={staggerContainer.viewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {storeFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={hoverScale}
                className="rounded-2xl overflow-hidden bg-white border border-brand-brown/5 group cursor-pointer"
              >
                <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-serif text-[#3E2F26] mb-2">
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

      <FindUs />
      <StoreStats />
      <WelcomeSection />
    </main>
  );
}
