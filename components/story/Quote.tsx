export default function Quote() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-24 md:py-32 bg-[#FEF7F2]">
      <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
        {/* Large Quotation Mark */}
        <span className="inline-block font-dm-serif text-[4rem] sm:text-[5rem] text-[#D2AC8D] leading-[0.5] mb-8 sm:mb-12 select-none">
          ”
        </span>

        {/* Quote Text */}
        <p className="font-dm-serif text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] text-[#1A110A] leading-[1.6] italic mb-10 sm:mb-12 tracking-wide">
          "We never scaled to grow faster; we only scaled to bring the authentic flavor of North Calcutta to a neighborhood that deserved it. In every bite, there is a piece of our childhood home."
        </p>

        {/* Separator Line */}
        <div className="w-16 h-[2px] bg-[#B08A63] mb-6" />

        {/* Attribution */}
        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#6E645B]">
          The Founding Family
        </span>
      </div>
    </section>
  );
}
