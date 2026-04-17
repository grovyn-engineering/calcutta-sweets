"use client";

import TestimonialCard from "@/components/ui/TestimonialCard";
import { useTestimonials } from "@/hooks/useAdminData";

export default function Testimonials() {
  const { data, loading } = useTestimonials();

  if (loading) {
    return (
      <section className="w-full bg-[#3D2B1F] py-24 px-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl animate-pulse text-center text-sm text-[#FAF3E8]/40">Loading…</div>
      </section>
    );
  }

  if (!data?.length) return null;

  return (
    <section className="w-full bg-[#3D2B1F] py-24 px-8 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <span className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-[#C8773A]">What people say</span>
          <h2 className="font-dm-serif text-4xl leading-tight text-[#FAF3E8] lg:text-5xl">Loved across generations.</h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {data.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
