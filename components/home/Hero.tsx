"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const sweets = [
  {
    name: "Sondesh",
    image: "/images/sondesh2.png",
    alt: "Assorted Sondesh – traditional Bengali milk sweets",
  },
  {
    name: "Chamcham",
    image: "/images/chamcham2.png",
    alt: "Delicious Chamcham sweets",
  },
  {
    name: "Malpua",
    image: "/images/malpua2.png",
    alt: "Golden brown Malpua dessert",
  },
  {
    name: "Roshogulla",
    image: "/images/roshogulla2.png",
    alt: "Spongy Roshogulla in sugar syrup",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sweets.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-32 sm:pt-44 md:pt-60 overflow-hidden bg-[var(--background)] min-h-[60vh] sm:min-h-[80vh] md:min-h-[100vh]"
    >
      {/* Background text — crossfades between slides */}
      {sweets.map((sweet, index) => (
        <h1
          key={sweet.name}
          className={`absolute text-center inset-x-0 select-none pointer-events-none z-0 font-dm-serif font-normal text-foreground tracking-wide transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{
            fontSize: "clamp(4rem, 11vw, 13rem)",
            lineHeight: 1,
            top: "20%",
            whiteSpace: "nowrap"
          }}
        >
          {sweet.name}
        </h1>
      ))}

      {/* Product images — absolute positioning to stack them and crossfade */}
      <div className="relative z-10 w-full h-96 min-h-[50vh]">
        {sweets.map((sweet, index) => (
          <div
            key={sweet.image}
            className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 relative" : "opacity-0"
              }`}
          >
            <Image
              src={sweet.image}
              alt={sweet.alt}
              width={1920}
              height={1080}
              priority={index === 0} // Only prioritize the first image to prevent LCP issues
              sizes="100vw"
              className="block w-full h-auto drop-shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-3">
        {sweets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-foreground scale-110"
              : "bg-foreground/30 hover:bg-foreground/60"
              }`}
          />
        ))}
      </div>

      {/* Floating CTA Button */}
      <div className="absolute top-1/2 right-24 z-20 -translate-y-1/2 hidden lg:block">
        <Link
          href="/menu"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-md text-foreground font-sans font-medium hover:bg-foreground/5 transition-colors group"
        >
          Explore Menu
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
