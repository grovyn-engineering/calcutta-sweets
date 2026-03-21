const milestones = [
  {
    year: "1947",
    title: "The Humble Threshold",
    description:
      "Opened our first 10x10 wooden shop in North Calcutta, serving only three types of sweets.",
    side: "left" as const,
  },
  {
    year: "1978",
    title: "The Pehla Revolution",
    description:
      "Introduced our signature winter Nolen Gur collection that became a city-wide sensation.",
    side: "right" as const,
  },
  {
    year: "2005",
    title: "Legacy Modernised",
    description:
      "Expanding to our Raipur flagship shop, maintaining the same 50-year-old dough starters.",
    side: "left" as const,
  },
  {
    year: "Today",
    title: "A Taste of Heritage",
    description:
      "Continuing the pure love of pure, hand-crafted joy for a new generation of connoisseurs.",
    side: "right" as const,
  },
];

export default function Timeline() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-FAF3E8">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 text-center mb-16 md:mb-24">
          Our Journey Through Time
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-16 md:gap-20">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
                  m.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    m.side === "right" ? "md:text-left md:pl-8" : "md:text-right md:pr-8"
                  }`}
                >
                  <span className="inline-block font-dm-serif text-2xl sm:text-3xl text-[#C8773A] mb-2">
                    {m.year}
                  </span>
                  <h3 className="font-dm-serif text-lg sm:text-xl text-zinc-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C8773A] border-4 border-white shadow-sm z-10" />

                {/* Spacer for the other side */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
