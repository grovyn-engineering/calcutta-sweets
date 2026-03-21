const stats = [
  {
    value: "Since 2000",
    label: "HERITAGE ESTABLISHED",
  },
  {
    value: "100% Natural",
    label: "NO PRESERVATIVES",
  },
  {
    value: "Loved by Generations",
    label: "AUTHENTIC TASTE",
  },
];

export default function StoreStats() {
  return (
    <section className="w-full bg-[#FAF5F0] border-y border-[#3E2B1E]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#3E2B1E]/10">
          {stats.map((s, idx) => (
            <div 
              key={s.label} 
              className={`flex flex-col items-center gap-2 ${idx !== 0 ? 'pt-8 md:pt-0' : ''}`}
            >
              <h3 className="font-dm-serif text-2xl sm:text-3xl text-[#3E2B1E]">
                {s.value}
              </h3>
              <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A4F44]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
