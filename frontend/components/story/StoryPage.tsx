"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ArtOfCraft from "@/components/story/ArtOfCraft";
import Timeline from "@/components/story/Timeline";
import Family from "@/components/story/Family";
import Quote from "@/components/story/Quote";
import GiftCTA from "@/components/story/GiftCTA";
import { useStory } from "@/hooks/useAdminData";
import FilledImageWithShimmer from "@/components/ui/FilledImageWithShimmer";
import { StoryPageSkeleton } from "@/components/ui/StorefrontSkeletons";
import {
  STORY_QUOTE_DEFAULT_ATTRIBUTION,
  STORY_QUOTE_DEFAULT_TEXT,
} from "@/lib/storyQuoteDefaults";

export default function StoryPage() {
  const { data: story, loading, error } = useStory();

  if (loading) {
    return <StoryPageSkeleton />;
  }

  if (error || !story) {
    return (
      <main className="min-h-screen bg-[#FEF7F2] flex items-center justify-center px-6 py-32">
        <p className="text-center text-[#5A4D40] text-sm max-w-md">
          {error ? `Could not load this page: ${error}` : "Story content is not available yet."}
        </p>
      </main>
    );
  }

  const titleText = story.title;
  const content = story.content;
  const imageUrl = story.imageUrl || "/images/sweet8.jpg";
  const titleLines = titleText.split(/,|\n/).map((t: string) => t.trim()).filter(Boolean);

  const craftSteps = Array.isArray(story.craftSteps) ? story.craftSteps : [];
  const familyMembers = Array.isArray(story.familyMembers) ? story.familyMembers : [];

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
            {(story.heroEyebrow || "").trim() ? (
              <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#9A6B29] font-semibold">
                {(story.heroEyebrow || "").trim()}
              </span>
            ) : null}

            <h1 className="font-dm-serif text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-[1.05] text-[#2C1D13]">
              {titleLines.map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <p className="text-[#5A4D40] text-sm sm:text-base leading-[1.8] max-w-md">
              {content}
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
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[550px] rounded-2xl overflow-hidden shadow-sm">
              <FilledImageWithShimmer
                key={imageUrl}
                src={imageUrl}
                alt="Sweets Story Hero"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {craftSteps.length > 0 && (
        <ArtOfCraft
          overline={(story.craftOverline || "").trim()}
          headline={(story.craftHeadline || "").trim()}
          imageUrl={(story.craftImageUrl || "").trim() || "/images/ingredients.png"}
          steps={craftSteps}
        />
      )}

      <Timeline
        heading={(story.timelineTitle || "").trim()}
        subtitle={(story.timelineSubtitle || "").trim()}
      />

      {familyMembers.length > 0 && (
        <Family
          sectionTitle={(story.familySectionTitle || "").trim()}
          members={familyMembers}
        />
      )}

      <GiftCTA />
      <Quote
        quoteText={
          (story.quoteText || "").trim() || STORY_QUOTE_DEFAULT_TEXT
        }
        attribution={
          (story.quoteAttribution || "").trim() ||
          STORY_QUOTE_DEFAULT_ATTRIBUTION
        }
      />

    </main>
  );
}
