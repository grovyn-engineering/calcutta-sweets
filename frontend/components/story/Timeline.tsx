"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useTimelineEvents } from "@/hooks/useAdminData";
import type { TimelineEvent } from "@/hooks/useAdminData";

const TimelineItem = ({ item, index }: { item: TimelineEvent; index: number }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { margin: "-48% 0px -48% 0px", once: false });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-10 md:mb-16 w-full`}
    >
      <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className={`w-4 h-4 rounded-full bg-[#CA793E] transition-shadow duration-500 ${isInView ? 'shadow-[0_0_20px_rgba(202,121,62,0.8)]' : 'shadow-none'}`}
        />
      </div>

      <div className={`w-[calc(100%-80px)] ml-[80px] md:ml-0 md:w-5/12 flex flex-col justify-center py-4 ${isEven ? 'md:pr-16 md:items-end md:text-right text-left items-start' : 'md:pl-16 text-left items-start'}`}>
        <span className="font-dm-serif text-3xl sm:text-4xl block text-[#CA793E]">
          {item.year}
        </span>

        <div className="relative inline-block mt-1 mb-2">
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#3E2F26]">
            {item.title}
          </h3>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isInView ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className={`absolute -bottom-1 h-[2px] bg-[#CA793E] left-0 ${isEven ? 'md:left-auto md:right-0' : ''}`}
          />
        </div>

        <p className="font-sans text-sm sm:text-base leading-relaxed font-medium text-zinc-600">
          {item.description}
        </p>
      </div>

      <div className="hidden md:block md:w-5/12" />
    </div>
  );
};


export default function Timeline({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useTimelineEvents();
  const milestones = data ?? [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotPosition = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2F26] mb-6">
              {heading}
            </h2>
            {subtitle ? (
              <p className="font-sans text-zinc-600 max-w-2xl mx-auto text-base sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </motion.div>
        </div>

        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">

          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#A67C46]/20 -translate-x-1/2 rounded-full" />

          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A67C46] via-[#CA793E] to-[#A67C46] -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(202,121,62,0.3)] z-10"
          />

          <motion.div
            style={{ top: dotPosition }}
            className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 -mt-3 sm:-mt-4 bg-[#FDFBF7] border-2 sm:border-4 border-[#CA793E] rounded-full z-30 shadow-[0_4px_10px_rgba(202,121,62,0.4)] flex items-center justify-center pointer-events-none"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#CA793E]" />
          </motion.div>

          <div className="relative z-20 pt-4 pb-4">
            {loading ? (
              <p className="text-center text-sm text-zinc-500 py-12">Loading timeline…</p>
            ) : milestones.length === 0 ? (
              <p className="text-center text-sm text-zinc-500 py-12">No timeline milestones yet.</p>
            ) : (
              milestones.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
