"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/**
 * Historical milestones defining the brand's decades-long journey.
 */
const milestones = [
  {
    year: "1947",
    title: "The Humble Threshold",
    description: "Opened our first 10x10 wooden shop in North Calcutta, serving only three types of sweets.",
  },
  {
    year: "1978",
    title: "The Pehla Revolution",
    description: "Introduced our signature winter Nolen Gur collection that became a city-wide sensation.",
  },
  {
    year: "2005",
    title: "Legacy Modernised",
    description: "Expanding to our Raipur flagship shop, maintaining the same 50-year-old dough starters.",
  },
  {
    year: "Today",
    title: "A Taste of Heritage",
    description: "Continuing the pure love of pure, hand-crafted joy for a new generation of connoisseurs.",
  },
];

/**
 * TimelineItem component handles the intersection-based reveal logic for individual milestones.
 */
const TimelineItem = ({ item, index }: { item: typeof milestones[0], index: number }) => {
  const ref = useRef(null);
  
  // Custom observer margin to trigger animations exactly when centered in the viewport
  const isInView = useInView(ref, { margin: "-48% 0px -48% 0px", once: false });
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-10 md:mb-16 w-full`}
    >
      {/* Central axis indicator dot with rhythmic pulsing animation on enter */}
      <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 z-20">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className={`w-4 h-4 rounded-full bg-[#CA793E] transition-shadow duration-500 ${isInView ? 'shadow-[0_0_20px_rgba(202,121,62,0.8)]' : 'shadow-none'}`}
        />
      </div>

      {/* Narrative block: alternates layout based on index for balanced visual flow */}
      <div className={`w-[calc(100%-80px)] ml-[80px] md:ml-0 md:w-5/12 flex flex-col justify-center py-4 ${isEven ? 'md:pr-16 md:items-end md:text-right text-left items-start' : 'md:pl-16 text-left items-start'}`}>
        <span className="font-dm-serif text-3xl sm:text-4xl block text-[#CA793E]">
          {item.year}
        </span>
        
        <div className="relative inline-block mt-1 mb-2">
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-zinc-900">
            {item.title}
          </h3>
          {/* Reactive progress underline synchronized with terminal intersection */}
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

      {/* Spacer to maintain symmetric grid layout on desktop */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
};

/**
 * Timeline component renders a scroll-driven vertical journey through brand history,
 * featuring a dynamic progress line and reactive milestone triggers.
 */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Normalized scroll progress mapping across the entire section length
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Balanced spring physics for fluid progress line tracking
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the vertical offset of the floating progress indicator
  const dotPosition = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro header with soft entry reveal */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-zinc-900 mb-6">
              Our Journey Through Time
            </h2>
            <p className="font-sans text-zinc-600 max-w-2xl mx-auto text-base sm:text-lg">
              Tracing our steps from a humble sweet shop to a nationwide celebration of original Bengali craftsmanship.
            </p>
          </motion.div>
        </div>

        {/* Global timeline track with primary background and animated fills */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
          
          {/* Static background rail for the timeline thread */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#A67C46]/20 -translate-x-1/2 rounded-full" />

          {/* Dynamic progress fill line synchronized with scroll depth */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A67C46] via-[#CA793E] to-[#A67C46] -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(202,121,62,0.3)] z-10"
          />

          {/* Reactive floating dot that tracks current viewport scroll progress */}
          <motion.div
            style={{ top: dotPosition }}
            className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 -mt-3 sm:-mt-4 bg-[#FDFBF7] border-2 sm:border-4 border-[#CA793E] rounded-full z-30 shadow-[0_4px_10px_rgba(202,121,62,0.4)] flex items-center justify-center pointer-events-none"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#CA793E]" />
          </motion.div>

          {/* Sequential milestone collection */}
          <div className="relative z-20 pt-4 pb-4">
            {milestones.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
