"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const sweets = [
  { name: "Sondesh", image: "/images/sandesh.png", alt: "Assorted Sondesh – traditional Bengali milk sweets" },
  { name: "Chamcham", image: "/images/chamcham.png", alt: "Delicious Chamcham sweets" },
  { name: "Malpua", image: "/images/malpua.png", alt: "Golden brown Malpua dessert" },
  { name: "Roshogulla", image: "/images/roshogulla.png", alt: "Spongy Roshogulla in sugar syrup" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sweets.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-32 sm:pt-44 md:pt-60 overflow-hidden bg-[var(--background)]"
    >
      {/* Background typography */}
      {sweets.map((sweet, index) => (
        <motion.h1
          key={sweet.name}
          initial={{ opacity: 0, y: 20 }}
          animate={index === currentIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-center inset-x-0 select-none pointer-events-none z-0 font-dm-serif font-normal text-foreground tracking-wide"
          style={{
            fontSize: "clamp(4rem, 11vw, 13rem)",
            lineHeight: 1,
            top: "10%",
            whiteSpace: "nowrap",
          }}
        >
          {sweet.name}
        </motion.h1>
      ))}
      
      {/* Main content container */}
      <div className="relative z-10 w-full">
        {/* Slide images */}
        {sweets.map((sweet, index) => (
          <motion.div
            key={sweet.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={index === currentIndex ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={index === currentIndex ? "block" : "hidden"}
          >
            <Image
              src={sweet.image}
              alt={sweet.alt}
              width={1920}
              height={1080}
              priority={index === 0}
              sizes="100vw"
              className="w-full h-auto drop-shadow-2xl block"
            />
          </motion.div>
        ))}

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