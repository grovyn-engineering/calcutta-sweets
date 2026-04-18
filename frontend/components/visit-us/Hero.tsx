"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";
import FindUs from "@/components/visit-us/FindUs";
import StoreStats from "@/components/visit-us/StoreStats";
import WelcomeSection from "@/components/visit-us/WelcomeSection";
import { useContactInfo, useVisitUsFeatures } from "@/hooks/useAdminData";
import {
  VISIT_DIRECTIONS_URL_DEFAULT,
  VISIT_FEATURES_HEADING_DEFAULT,
  VISIT_FEATURES_SUBTITLE_DEFAULT,
  VISIT_HERO_DESCRIPTION_DEFAULT,
  VISIT_HERO_EYEBROW_DEFAULT,
  VISIT_HERO_IMAGE_DEFAULT,
  VISIT_HERO_TITLE_DEFAULT,
} from "@/lib/visitUsPageDefaults";
import FilledImageWithShimmer from "@/components/ui/FilledImageWithShimmer";
import {
  VisitFeatureCardsSkeleton,
  VisitHeroBannerSkeleton,
} from "@/components/ui/StorefrontSkeletons";

const FALLBACK_FEATURE_CARDS = [
  {
    id: "fallback-1",
    title: "The Golden Display",
    description:
      "An array of fresh Sandesh and Roshogolla, curated daily to perfection.",
    image: "/images/sweet2.jpg",
  },
  {
    id: "fallback-2",
    title: "Artisanal Craft",
    description:
      "Every sweet is a masterpiece of texture and balance, crafted by experts.",
    image: "/images/sweet3.jpg",
  },
  {
    id: "fallback-3",
    title: "Refined Atmosphere",
    description:
      "A serene space designed for the connoisseur who appreciates fine traditional taste.",
    image: "/images/shopInterior.png",
  },
];

export default function Hero() {
  const { data: contactData, loading: contactLoading } = useContactInfo();
  const { data: featureRows, loading: featuresLoading } = useVisitUsFeatures();

  const rawContact = Array.isArray(contactData) ? contactData[0] : contactData;
  const phone = rawContact?.phone || "+91 99930 60082";

  const heroImage =
    (rawContact?.visitHeroImageUrl || "").trim() || VISIT_HERO_IMAGE_DEFAULT;
  const heroEyebrow =
    (rawContact?.visitHeroEyebrow || "").trim() || VISIT_HERO_EYEBROW_DEFAULT;
  const heroTitle =
    (rawContact?.visitHeroTitle || "").trim() || VISIT_HERO_TITLE_DEFAULT;
  const heroDescription =
    (rawContact?.visitHeroDescription || "").trim() ||
    VISIT_HERO_DESCRIPTION_DEFAULT;
  const directionsUrl =
    (rawContact?.visitDirectionsUrl || "").trim() || VISIT_DIRECTIONS_URL_DEFAULT;

  const featuresHeading =
    (rawContact?.visitFeaturesHeading || "").trim() ||
    VISIT_FEATURES_HEADING_DEFAULT;
  const featuresSubtitle =
    (rawContact?.visitFeaturesSubtitle || "").trim() ||
    VISIT_FEATURES_SUBTITLE_DEFAULT;

  const storeFeatures = useMemo(() => {
    if (featuresLoading) return null;
    if (featureRows && featureRows.length > 0) {
      return featureRows.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        image: (f.imageUrl || "").trim() || "/images/sweet2.jpg",
      }));
    }
    return FALLBACK_FEATURE_CARDS;
  }, [featuresLoading, featureRows]);

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
              {contactLoading ? (
                <VisitHeroBannerSkeleton />
              ) : (
                <>
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[220px] max-h-[min(72vh,640px)]">
                    <FilledImageWithShimmer
                      key={heroImage}
                      src={heroImage}
                      alt="Calcutta Sweets storefront"
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/30 to-transparent pointer-events-none" />
                </>
              )}
            </motion.div>

            {!contactLoading ? (
              <motion.div
                {...fadeUp}
                className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 sm:px-10 md:px-16 pb-6 sm:pb-12 md:pb-16 pt-16 sm:pt-0"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-2 sm:mb-3">
                  {heroEyebrow}
                </span>

                <h1 className="text-2xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-2 sm:mb-4">
                  {heroTitle}
                </h1>

                <p className="text-xs sm:text-sm text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed">
                  {heroDescription}
                </p>

                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <a
                    href={directionsUrl}
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
            ) : null}

          </div>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-[#FAF3E8]">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#3E2F26] mb-4">
              {featuresHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] max-w-2xl mx-auto">
              {featuresSubtitle}
            </p>
          </motion.div>

          {featuresLoading || storeFeatures === null ? (
            <VisitFeatureCardsSkeleton />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={staggerContainer.viewport}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {storeFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={fadeUp}
                  whileHover={hoverScale}
                  className="rounded-2xl overflow-hidden bg-white border border-brand-brown/5 group cursor-pointer"
                >
                  <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden">
                    <FilledImageWithShimmer
                      key={feature.image}
                      src={feature.image}
                      alt={feature.title}
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
          )}

        </div>
      </section>

      <FindUs />
      <StoreStats />
      <WelcomeSection />
    </main>
  );
}
