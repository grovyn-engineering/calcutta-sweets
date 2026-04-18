"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  ClipboardEdit,
  Palette,
  CookingPot,
  Truck,
  Sparkles,
  Gift,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useCelebrationProcessSteps } from "@/hooks/useAdminData";
import { ProcessStepsSkeleton } from "@/components/ui/StorefrontSkeletons";

const ICONS: Record<string, LucideIcon> = {
  ClipboardEdit,
  Palette,
  CookingPot,
  Truck,
  Sparkles,
  Gift,
  Heart,
};

export default function Process() {
  const { data, loading } = useCelebrationProcessSteps();

  if (loading) {
    return <ProcessStepsSkeleton />;
  }

  if (!data?.length) return null;

  return (
    <section className="w-full bg-[#FEF7F2] py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <h2 className="font-dm-serif text-3xl tracking-wide text-[#2C1D13] sm:text-4xl md:text-[2.5rem] mb-4">
            Seamless Celebrations
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8 lg:px-10"
        >
          {data.map((step) => {
            const Icon = ICONS[step.iconKey] ?? ClipboardEdit;
            return (
              <motion.div
                key={step.id}
                variants={fadeUp}
                className="relative flex min-h-[260px] flex-col justify-between rounded-[2rem] border border-[#F4EBE3] bg-[#FFFDFA] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] lg:p-8"
              >
                <div className="mb-8 flex w-full items-start justify-between">
                  <div className="mt-2 text-[#A27339]">
                    <Icon className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
                  </div>
                  <div className="pointer-events-none select-none font-dm-serif text-[4rem] leading-[0.8] text-[#F1E7DD] lg:text-[5rem]">
                    {step.stepNumber}
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="mb-3 font-sans text-sm font-extrabold tracking-wide text-[#2C1D13] lg:text-[15px]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[11px] leading-[1.8] text-[#7D7063] lg:text-xs">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
