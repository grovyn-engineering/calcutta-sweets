"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import { useContactInfo, useCelebrationHero } from "@/hooks/useAdminData";
import FilledImageWithShimmer from "@/components/ui/FilledImageWithShimmer";

const FALLBACK = {
  eyebrow: "BULK & CUSTOM ORDERS",
  title: "Sweeten Every Celebration.",
  subtitle:
    "From custom gift boxes to wedding platters, we help make your celebrations a bit sweeter. Everything is made by hand and delivered fresh to your door.",
  mainImageUrl: "/images/sweet8.jpg",
  secondaryLeftUrl: "/images/sweet5.jpg",
  secondaryRightUrl: "/images/sweet6.jpg",
};

function CelebrationHeroLoading() {
  return (
    <section className="pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FEF5ED] min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex flex-col gap-6">
          <div className="h-3 w-48 rounded-full storefront-shimmer-surface" />
          <div className="space-y-3">
            <div className="h-12 sm:h-14 md:h-16 w-full max-w-md rounded-2xl storefront-shimmer-surface" />
            <div className="h-12 sm:h-14 md:h-16 w-full max-w-sm rounded-2xl storefront-shimmer-surface" />
          </div>
          <div className="space-y-2 max-w-[480px]">
            <div className="h-3 w-full rounded-full storefront-shimmer-surface" />
            <div className="h-3 w-full rounded-full storefront-shimmer-surface" />
            <div className="h-3 w-4/5 rounded-full storefront-shimmer-surface" />
          </div>
          <div className="flex flex-wrap gap-5 pt-2">
            <div className="h-12 w-44 rounded-full storefront-shimmer-surface" />
            <div className="h-12 w-44 rounded-full storefront-shimmer-surface" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden storefront-shimmer-surface" />
          <div className="grid grid-cols-2 gap-3">
            <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl storefront-shimmer-surface" />
            <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl storefront-shimmer-surface" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const { data: hero, loading } = useCelebrationHero();
  const { data: contactData } = useContactInfo();

  const rawContact = Array.isArray(contactData) ? contactData[0] : contactData;
  const phone = rawContact?.phone || "+91 99930 60082";

  if (loading && hero == null) {
    return <CelebrationHeroLoading />;
  }

  const eyebrow = hero?.eyebrow?.trim() || FALLBACK.eyebrow;
  const title = hero?.title?.trim() || FALLBACK.title;
  const subtitle = hero?.subtitle?.trim() || FALLBACK.subtitle;

  const titleWords = title.split(" ");
  const lastWord = titleWords.pop();
  const restOfTitle = titleWords.join(" ");

  const mainSrc = hero?.mainImageUrl?.trim() || FALLBACK.mainImageUrl;
  const leftSrc = hero?.secondaryLeftUrl?.trim() || FALLBACK.secondaryLeftUrl;
  const rightSrc = hero?.secondaryRightUrl?.trim() || FALLBACK.secondaryRightUrl;

  return (
    <section className="pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FEF5ED] min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div {...fadeUp}>
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#AF7B34] mb-6 block">
            {eyebrow}
          </span>

          <h1 className="font-dm-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#342114] leading-[1.1] mb-6">
            <span className="block">
              {restOfTitle ? (
                <>
                  {restOfTitle}
                  <br />
                </>
              ) : null}
              <span className="text-[#CF7B38]">{lastWord}</span>
            </span>
          </h1>

          <p className="font-sans text-[#5A4D40] text-base sm:text-[17px] leading-[1.8] max-w-[480px] mb-10">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/menu"
              className="px-9 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm active:scale-95"
            >
              Curate Your Order
            </Link>
            <a
              href={`tel:${phone}`}
              className="px-9 py-3.5 rounded-full border border-[#BBAA9A] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors active:scale-95"
            >
              Call to Enquire
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="flex flex-col gap-3"
        >
          <motion.div
            variants={fadeUp}
            whileHover={hoverScale}
            className="relative w-full h-[240px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
          >
            <FilledImageWithShimmer
              key={mainSrc}
              src={mainSrc}
              alt={title}
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
            <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
              <FilledImageWithShimmer
                key={leftSrc}
                src={leftSrc}
                alt=""
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
              <FilledImageWithShimmer
                key={rightSrc}
                src={rightSrc}
                alt=""
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
