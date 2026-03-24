import Image from "next/image";
import FindUs from "@/components/visit-us/FindUs";
import StoreStats from "@/components/visit-us/StoreStats";
import WelcomeSection from "@/components/visit-us/WelcomeSection";

const storeFeatures = [
  {
    title: "The Golden Display",
    description:
      "An array of fresh Sandesh and Roshogolla, curated daily to perfection.",
    image: "/images/sweet2.jpg",
  },
  {
    title: "Artisanal Craft",
    description:
      "Every sweet is a masterpiece of texture and balance, crafted by experts.",
    image: "/images/sweet3.jpg",
  },
  {
    title: "Refined Atmosphere",
    description:
      "A serene space designed for the connoisseur who appreciates fine traditional taste.",
    image: "/images/shop3.jpg",
  },
];

export default function Hero() {
  return (
    <main className="min-h-screen bg-[#FAF3E8]">

      <section className="px-4 md:px-8 lg:px-12 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">

          {/* HERO IMAGE */}
          <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-md">

            {/* Image */}
            <Image
              src="/images/shop1.jpg"
              alt="Calcutta Sweets storefront"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-12 md:pb-16">

              {/* Location */}
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">
                TATIBANDH, RAIPUR
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.1] mb-4">
                Come Find Us.
              </h1>

              {/* Description */}
              <p className="text-sm text-white/80 max-w-md mb-8 leading-relaxed">
                Step into a world of tradition, cardamom, and handcrafted sweetness.
                We've been here since 2000 and we're not going anywhere.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://maps.google.com/?q=Calcutta+Sweets+Tatibandh+Raipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#B45309] text-white text-sm font-medium hover:bg-[#9a3f07] transition"
                >
                  Get Directions
                </a>

                <a
                  href="tel:+919876543210"
                  className="px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-black transition"
                >
                  Call the Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── EXPERIENCE SECTION ───────── */}
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28 bg-[#FAF3E8]">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#3E2F26] mb-4">
              Experience Authenticity
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] max-w-2xl mx-auto">
              Our store is more than a shop; it is an invitation to witness the
              heritage of Bengal. Breathe in the aroma of fresh cardamom and watch our karigars at work.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl overflow-hidden bg-[#ffffff] border border-black/5"
              >
                {/* Image */}
                <div className="relative h-[260px] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Bottom Content Panel */}
                <div className="p-6">
                  <h3 className="text-lg font-serif text-[#3E2F26] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-[#6F6F6F] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Sections */}
      <FindUs />
      <StoreStats />
      <WelcomeSection />
    </main>
  );
}