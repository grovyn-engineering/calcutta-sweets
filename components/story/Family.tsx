"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

/**
 * Key historical figures and leadership of the brand.
 */
const familyMembers = [
  {
    name: "Anjali Devi",
    title: "THE MATRIARCH",
    description:
      "The keeper of the original ledger. She believed that sugar should only ever be second to the richness of milk.",
    image: "/images/chef1.jpg",
  },
  {
    name: "Debasish Gupta",
    title: "THE ARCHITECT",
    description:
      "The visionary who balanced tradition with scale. He introduced the precision of modern kitchen science to ancestral art.",
    image: "/images/chef2.jpg",
  },
  {
    name: "Aritra Gupta",
    title: "THE CURATOR",
    description:
      "Ensuring the legacy reaches the next generation through digital craftsmanship and uncompromising quality standards.",
    image: "/images/chef3.jpg",
  },
];

/**
 * Family component introduces the key personalities behind the brand's heritage,
 * using a refined card grid with staggered reveal animations.
 */
export default function Family() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Narrative-style section headline with grounding accent line */}
        <motion.div {...fadeUp}>
          <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 text-center mb-4 leading-tight">
            Three Generations, One
            <br />
            Family.
          </h2>
          <div className="w-16 h-0.5 bg-[#C8773A] mx-auto mb-10 md:mb-14" />
        </motion.div>

        {/* Responsive generational grid with deliberate vertical pacing */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start"
        >
          {familyMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className={`flex flex-col ${i === 1 ? "md:mt-8" : ""}`}
            >
              {/* Profile card featuring portrait and key designation */}
              <motion.div 
                whileHover={hoverScale}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 group cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full bg-[#F5EDE3]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="px-5 py-4">
                  <span className="font-sans text-[10px] text-[#C8773A] font-bold uppercase tracking-[0.2em] block mb-1">
                    {member.title}
                  </span>
                  <h3 className="font-dm-serif text-lg text-zinc-900">
                    {member.name}
                  </h3>
                </div>
              </motion.div>

              {/* Contextual biography detailing their individual contribution to the legacy */}
              <p className="font-sans text-sm text-zinc-500 leading-relaxed mt-5 px-1">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
