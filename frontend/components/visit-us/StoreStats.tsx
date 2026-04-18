"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useVisitUsStats, type VisitUsStat } from "@/hooks/useAdminData";
import { VISIT_STORE_STATS_DEFAULT } from "@/lib/visitUsPageDefaults";
import { StoreStatsSkeleton } from "@/components/ui/StorefrontSkeletons";

export default function StoreStats() {
  const { data, loading } = useVisitUsStats();

  if (loading) {
    return <StoreStatsSkeleton />;
  }

  const rows: VisitUsStat[] =
    data && data.length > 0
      ? data
      : [...VISIT_STORE_STATS_DEFAULT].map((s) => ({
          id: s.id,
          value: s.value,
          label: s.label,
          sortOrder: s.sortOrder,
        }));

  return (
    <section className="w-full border-y border-[#3E2B1E]/10 bg-[#FAF5F0]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 md:px-16 lg:px-24 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 gap-0 text-center md:grid-cols-3 md:divide-x md:divide-[#3E2B1E]/10"
        >
          {rows.map((s, idx) => (
            <motion.div
              key={s.id}
              variants={fadeUp}
              className={`flex flex-col items-center gap-2 py-8 md:py-0
                ${idx !== 0 ? "border-t border-[#3E2B1E]/10 md:border-t-0" : ""}
                ${idx === 0 ? "pt-0 md:py-0" : ""}
                ${idx === data.length - 1 ? "pb-0 md:py-0" : ""}
              `}
            >
              <h3 className="font-dm-serif text-2xl text-[#3E2B1E] sm:text-3xl">{s.value}</h3>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[#5A4F44] sm:text-[10px]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
