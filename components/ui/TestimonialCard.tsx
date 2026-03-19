import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export default function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div className="flex flex-col p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 shadow-lg h-full">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#C8773A] text-[#C8773A]" />
        ))}
      </div>

      {/* Quote */}
      <p className="font-sans text-[#FAF3E8]/80 text-sm leading-relaxed mb-8 flex-grow">
        "{quote}"
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 mb-6 mt-auto" />

      {/* Author */}
      <div className="flex flex-col gap-1">
        <span className="font-sans font-bold text-[#FAF3E8] text-sm">
          {name}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#FAF3E8]/50 font-medium">
          {title}
        </span>
      </div>
    </div>
  );
}
