import Image from "next/image";

const steps = [
  {
    icon: "🌅",
    title: "The Morning Curd",
    description:
      "Each dawn, we receive fresh, full-cream curd-whole milk, split by hand to create the purest Chenna (curd) in Bengal.",
  },
  {
    icon: "🤲",
    title: "The Rhythmic Knead",
    description:
      "Our master confectioners use the warmth of their palms to mould and refine. Rhythm is key. Machine mixing cannot replicate this.",
  },
  {
    icon: "🍃",
    title: "The Gentle Poach",
    description:
      "Each sphere is gently lowered in precisely timed oil or syrup till perfection. The precision that gives our confections their hallmark lightness.",
  },
];

export default function ArtOfCraft() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — Image */}
        <div className="w-full lg:w-[45%] relative aspect-[3/2] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] shrink-0">
          <Image
            src="/images/sweet3.jpg"
            alt="Hand-kneaded sweet preparation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        {/* Right — Content */}
        <div className="w-full lg:w-[55%] flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7A6A5A]">
              How We Make It
            </span>
            <h2 className="font-dm-serif text-[2.5rem] sm:text-[3rem] lg:text-[3.2rem] leading-[1.1] text-[#1A110A]">
              The Art of Hand-Kneaded
              <br />
              Perfection
            </h2>
          </div>

          {/* Process Timeline Steps */}
          <div className="flex flex-col mt-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-7 sm:gap-9">
                {/* Timeline Column */}
                <div className="flex flex-col items-center">
                  {/* Circle Number */}
                  <div className="shrink-0 w-11 h-11 bg-white rounded-full border-[2px] border-[#A87948] flex items-center justify-center shadow-sm z-10">
                    <span className="text-[#A87948] font-sans font-bold text-sm sm:text-base tracking-widest ml-px">
                      0{i + 1}
                    </span>
                  </div>
                  {/* Connecting Line */}
                  {i !== steps.length - 1 && (
                    <div className="w-[2px] flex-grow bg-[#E8DCD0] my-1" />
                  )}
                </div>

                {/* Text Column */}
                <div className={`flex flex-col gap-1.5 pt-1.5 ${i !== steps.length - 1 ? "pb-12 lg:pb-14" : ""}`}>
                  <h3 className="font-sans font-bold text-[16px] xl:text-[17px] text-[#2C241E] leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] xl:text-[15px] text-[#6E645B] leading-[1.65] max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
