"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

const familyMembers = [
  {
    name: "CHEF 1",
    title: "THE MATRIARCH",
    description:
      "She kept the original family recipes and always insisted that the quality of the milk is what makes a sweet truly special.",
    image: "/images/chef1.jpg",
  },
  {
    name: "CHEF 2",
    title: "THE ARCHITECT",
    description:
      "He helped us grow while keeping our traditional roots, bringing better kitchen standards to our family old school methods.",
    image: "/images/chef2.jpg",
  },
  {
    name: "Aloke Bera",
    title: "THE CURATOR",
    description:
      "He is making sure our family legacy carries on, focusing on the same high quality while sharing our story with a new generation.",
    image: "/images/chef3.jpg",
  },
];

export default function Family() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div {...fadeUp}>
          <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-[#3E2F26] text-center mb-4 leading-tight">
            Three Generations, One
            <br />
            Family.
          </h2>
          <div className="w-16 h-0.5 bg-[#C8773A] mx-auto mb-10 md:mb-14" />
        </motion.div>

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
              <motion.div
                whileHover={hoverScale}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 group cursor-pointer"
              >
                <Link href="/menu" className="block">
                  <div className="relative aspect-[4/5] w-full bg-[#F5EDE3]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-5 py-4">
                    <span className="font-sans text-[10px] text-[#C8773A] font-bold uppercase tracking-[0.2em] block mb-1">
                      {member.title}
                    </span>
                    <h3 className="font-dm-serif text-lg text-[#3E2F26]">
                      {member.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>

              <p className="font-sans text-sm text-[#3E2F26] leading-relaxed mt-5 px-1">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
