import Image from "next/image";

const familyMembers = [
  {
    name: "Anjali Devi",
    title: "THE MATRIARCH",
    description:
      "The keeper of the original ledger. She believed that sugar should only ever be second to the richness of milk.",
    image: "/images/chef1.jpg",
  },
  {
    name: "Debasish Gupta",
    title: "THE ARCHITECT",
    description:
      "The visionary who balanced tradition with scale. He introduced the precision of modern kitchen science to ancestral art.",
    image: "/images/chef2.jpg",
  },
  {
    name: "Aritra Gupta",
    title: "THE CURATOR",
    description:
      "Ensuring the legacy reaches the next generation through digital craftsmanship and uncompromising quality standards.",
    image: "/images/chef3.jpg",
  },
];

export default function Family() {
  return (
    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 text-center mb-4 leading-tight">
          Three Generations, One
          <br />
          Family.
        </h2>
        <div className="w-16 h-0.5 bg-[#C8773A] mx-auto mb-16 md:mb-20" />

        {/* Family Grid — staggered card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
          {familyMembers.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col ${i === 1 ? "md:mt-12" : ""}`}
            >
              {/* Card with image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
                <div className="relative aspect-[4/5] w-full bg-[#F5EDE3]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Name label inside card */}
                <div className="px-5 py-4">
                  <span className="font-sans text-[10px] text-[#C8773A] font-bold uppercase tracking-[0.2em] block mb-1">
                    {member.title}
                  </span>
                  <h3 className="font-dm-serif text-lg text-zinc-900">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Description below card */}
              <p className="font-sans text-sm text-zinc-500 leading-relaxed mt-5 px-1">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
