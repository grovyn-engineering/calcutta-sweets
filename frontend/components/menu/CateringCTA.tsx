"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSpecialOrders, useWeddingStats } from "@/hooks/useAdminData";

const FALLBACK_STATS = [
  { value: "500+", label: "ORDERS MONTHLY" },
  { value: "3 Days", label: "ADVANCE BOOKING" },
  { value: "100%", label: "PURE DESI GHEE" },
  { value: "20+", label: "AWARDED RECIPES" },
];

// Catering section for weddings and large gatherings
export default function CateringCTA() {
  const { data: specialOrder } = useSpecialOrders();
  const { data: weddingStats } = useWeddingStats();

  const title = specialOrder?.title || "Planning a wedding or gathering?";
  const description = specialOrder?.description || "Make your special occasions even sweeter with our bulk catering services. We offer customized packaging and fresh delivery for events of all sizes.";

  const displayStats = weddingStats && weddingStats.length > 0 ? weddingStats : FALLBACK_STATS;

  return (
    <section className="py-20 px-6 md:px-12 bg-[#FAF3E8] overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Link to catering enquiry form and brochure */}
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3E2F26] leading-tight mb-4">
            {title}
          </h2>

          <p className="text-sm text-[#6F6F6F] leading-relaxed mb-8 max-w-md whitespace-pre-line">
            {description}
          </p>

          {/* Form and brochure actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/celebration#enquiry-form"
              className="px-6 py-3 rounded-full bg-[#4B2E1E] text-white text-sm font-medium hover:bg-[#3b2417] hover:scale-105 transition-all active:scale-95 shadow-sm"
            >
              Enquire Now
            </Link>

            <Link
              href="#"
              className="px-6 py-3 rounded-full border border-[#4B2E1E] text-[#4B2E1E] text-sm font-medium hover:bg-[#4B2E1E]/10 hover:scale-105 transition-all active:scale-95"
            >
              Download Brochure
            </Link>
          </div>
        </motion.div>

        {/* Stats card display */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#4B2E1E] to-[#2E1B12] text-white p-8 md:p-10 shadow-xl overflow-hidden">
            
            {/* Quality and scale stats grid */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={staggerContainer.viewport}
              className="grid grid-cols-2"
            >
              {displayStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className={`p-6 flex flex-col items-center text-center ${
                    index === 0 ? "border-b border-r border-white/10" :
                    index === 1 ? "border-b border-white/10" :
                    index === 2 ? "border-r border-white/10" : ""
                  }`}
                >
                  <span className="text-2xl md:text-3xl font-semibold text-[#F0A23A] mb-2">
                    {stat.value}
                  </span>

                  <span className="text-[10px] tracking-widest text-white/60 uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
