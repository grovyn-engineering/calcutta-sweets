import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FEF5ED] min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Text Content */}
        <div>
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#AF7B34] mb-6 block">
            BULK & CUSTOM ORDERS
          </span>
          <h1 className="font-dm-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#342114] leading-[1.1] mb-6">
            Sweeten Every
            <br />
            <span className="text-[#CF7B38]">Celebration.</span>
          </h1>
          <p className="font-sans text-[#5A4D40] text-base sm:text-[17px] leading-[1.8] max-w-[480px] mb-10">
            From artisanal Mishti boxes to grand wedding platters, bring the authentic heritage of Bengal to your most cherished moments. Crafted by hand, delivered with lots of love and care.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button className="px-9 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm">
              Curate Your Order
            </button>
            <button className="px-9 py-3.5 rounded-full border border-[#BBAA9A] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors">
              Call to Enquire
            </button>
          </div>
        </div>

        {/* Right Side: 2x2 Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              src="/images/sweet2.jpg"
              alt="Assorted sweets"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              src="/images/sweet3.jpg"
              alt="Roshogolla in a bowl"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              src="/images/sweet4.jpg"
              alt="Payesh in an earthen bowl"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              src="/images/sweet5.jpg"
              alt="Premium sweet box"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
