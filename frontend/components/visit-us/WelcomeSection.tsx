"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Map, Phone, Clock, ChevronRight } from "lucide-react";
import { useContactInfo, type ContactInfo } from "@/hooks/useAdminData";
import {
  VISIT_DIRECTIONS_URL_DEFAULT,
  VISIT_WELCOME_HEADING_DEFAULT,
  VISIT_WELCOME_BODY_DEFAULT,
  VISIT_OWNER_NAME_DEFAULT,
  VISIT_OWNER_ROLE_DEFAULT,
  VISIT_OWNER_IMAGE_DEFAULT,
  VISIT_WELCOME_LOCATION_LINE_DEFAULT,
  VISIT_WELCOME_HOURS_LINE_DEFAULT,
} from "@/lib/visitUsPageDefaults";

function welcomeLocationLine(c: ContactInfo | null): string {
  const line = c?.visitWelcomeLocationLine?.trim();
  if (line) return line;
  const addr = c?.address?.trim();
  if (addr) return addr.split("\n")[0]?.trim() || addr;
  return VISIT_WELCOME_LOCATION_LINE_DEFAULT;
}

function welcomeHoursLine(c: ContactInfo | null): string {
  const line = c?.visitWelcomeHoursLine?.trim();
  if (line) return line;
  const h = c?.hours?.trim();
  if (h) return h.split("|")[0]?.trim() || h;
  return VISIT_WELCOME_HOURS_LINE_DEFAULT;
}

export default function WelcomeSection() {
  const { data } = useContactInfo();
  const c = Array.isArray(data) ? data[0] : data;

  const phone = c?.phone?.trim() || "+91 99930 60082";
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  const headingRaw = (
    c?.visitWelcomeHeading?.trim() || VISIT_WELCOME_HEADING_DEFAULT
  ).replace(/\\n/g, "\n");
  const headingLines = headingRaw
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const body = c?.visitWelcomeBody?.trim() || VISIT_WELCOME_BODY_DEFAULT;
  const ownerName = c?.visitOwnerName?.trim() || VISIT_OWNER_NAME_DEFAULT;
  const ownerRole = c?.visitOwnerRole?.trim() || VISIT_OWNER_ROLE_DEFAULT;
  const ownerSrc =
    c?.visitOwnerImageUrl?.trim() || VISIT_OWNER_IMAGE_DEFAULT;

  const mapsUrl =
    c?.visitDirectionsUrl?.trim() || VISIT_DIRECTIONS_URL_DEFAULT;
  const locationLine = welcomeLocationLine(c);
  const hoursLine = welcomeHoursLine(c);

  return (
    <section className="w-full bg-[#FAF5F0] px-4 md:px-8 lg:px-12 py-20 pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <motion.div
          {...fadeUp}
          className="flex flex-col"
        >
          <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2B1E] leading-[1.15] mb-8">
            {headingLines.map((line: string, i: number) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4F44] leading-relaxed max-w-md mb-12">
            {body}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 relative shrink-0">
              <Image
                src={ownerSrc}
                alt={ownerName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, 48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm text-[#3E2B1E]">
                {ownerName}
              </span>
              <span className="font-sans text-xs text-[#5A4F44]">
                {ownerRole}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="flex flex-col gap-6"
        >

          <motion.a
            variants={fadeUp}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Map className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  FIND US AT
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  {locationLine}
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={telHref}
            className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  CALL US
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  {phone}
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  OPEN DAILY
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  {hoursLine}
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </motion.div>

        </motion.div>


      </div>
    </section>
  );
}
