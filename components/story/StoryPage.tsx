"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ArtOfCraft from "@/components/story/ArtOfCraft";
import Timeline from "@/components/story/Timeline";
import Family from "@/components/story/Family";
import Quote from "@/components/story/Quote";
import GiftCTA from "@/components/story/GiftCTA";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#FEF7F2] overflow-x-hidden">

      <section className="relative w-full bg-[#F5EDE6] px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 sm:pt-32 lg:pt-36 pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#9A6B29] font-semibold">
              CALCUTTA SWEETS
            </span>

            <h1 className="font-dm-serif text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-[1.05] text-[#2C1D13]">
              A Recipe <br />
              Older <br />
              Than Raipur
            </h1>

            <p className="text-[#5A4D40] text-sm sm:text-base leading-[1.8] max-w-md">
              Making the perfect Mishti takes time and a lot of practice. It is about knowing exactly when the milk is ready. This is a skill passed down through three generations of our family.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/menu"
                className="px-7 py-3 rounded-full bg-[#9B6E2C] text-white text-sm font-semibold hover:bg-[#7c561f] transition"
              >
                Explore Our Menu
              </Link>

              <Link
                href="/visit-us"
                className="px-7 py-3 rounded-full border border-[#D4C8BC] text-sm font-semibold text-[#2D1B0F] hover:bg-[#EFE4DA] transition"
              >
                Visit Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex flex-col gap-3">

              <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/sweet8.jpg"
                  alt="Rasgulla"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/sweet5.jpg"
                    alt="Sweets"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/sweet6.jpg"
                    alt="Dessert"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <ArtOfCraft />
      <Timeline />
      <Family />
      <GiftCTA />
      <Quote />

    </main>
  );
}