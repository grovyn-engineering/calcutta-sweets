"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const sweets = [
  { name: "Sondesh", image: "/images/hero/sondeshhero.png", alt: "Assorted Sondesh – traditional Bengali milk sweets" },
  { name: "Chamcham", image: "/images/hero/chamchamhero.png", alt: "Delicious Chamcham sweets" },
  { name: "Malpua", image: "/images/hero/malpuahero.png", alt: "Golden brown Malpua dessert" },
  { name: "Roshogulla", image: "/images/hero/roshogullahero.png", alt: "Spongy Roshogulla in sugar syrup" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sweets.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-28 sm:pt-44 md:pt-60 overflow-hidden bg-[var(--background)]"
    >
      {/* Background typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 text-center top-[16%] lg:top-[10%] select-none pointer-events-none z-0 font-dm-serif font-normal text-foreground tracking-wide"
            style={{
              fontSize: "clamp(4rem, 11vw, 13rem)",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {sweets[currentIndex].name}
          </motion.h1>
        </AnimatePresence>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Slide images */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-auto"
          >
            <Image
              src={sweets[currentIndex].image}
              alt={sweets[currentIndex].alt}
              width={1920}
              height={1080}
              priority={currentIndex === 0}
              sizes="100vw"
              className="w-full h-auto drop-shadow-2xl block"
            />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Dots overlaid at bottom of image */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-3">
          {sweets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-foreground scale-110"
                  : "bg-foreground/30 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA for large screens */}
      <div className="absolute top-1/2 right-24 z-20 -translate-y-1/2 hidden lg:block">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <Link
            href="/menu"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-md text-foreground font-sans font-medium hover:bg-foreground hover:text-background hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            Explore Menu
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}