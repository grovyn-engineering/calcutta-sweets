// import Image from "next/image";
// import Link from "next/link";
// import FindUs from "@/components/visit-us/FindUs";
// import StoreStats from "@/components/visit-us/StoreStats";
// import WelcomeSection from "@/components/visit-us/WelcomeSection";

// const storeFeatures = [
//   {
//     title: "The Golden Display",
//     description:
//       "An array of fresh Sandesh and Roshogolla, curated daily to perfection.",
//     image: "/images/sweet2.jpg",
//   },
//   {
//     title: "Artisanal Craft",
//     description:
//       "Every sweet is a masterpiece of texture and balance, crafted by experts.",
//     image: "/images/sweet3.jpg",
//   },
//   {
//     title: "Refined Atmosphere",
//     description:
//       "A serene space designed for the connoisseur who appreciates fine traditional taste.",
//     image: "/images/shop3.jpg",
//   },
// ];

// export default function Hero() {
//   return (
//     <main className="min-h-screen bg-[var(--background)]">
//       {/* ── Hero Section — Shop Image with Overlay ── */}
//       <section className="relative w-full h-[85vh] min-h-[550px]">
//         {/* Shop background image */}
//         <Image
//           src="/images/shop1.jpg"
//           alt="Calcutta Sweets storefront in Tatibandh, Raipur"
//           fill
//           className="object-cover"
//           sizes="100vw"
//           priority
//         />

//         {/* Dark gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

//         {/* Content overlay */}
//         <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-20">
//           {/* Location tag */}
//           <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-3">
//             Tatibandh, Raipur
//           </span>

//           {/* Heading */}
//           <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] italic mb-4 max-w-lg">
//             Come Find Us.
//           </h1>

//           {/* Description */}
//           <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-md mb-8">
//             Step into a world of tradition, cardamom, and handcrafted sweetness.
//             We&apos;ve been here since 2000 and we&apos;re not going anywhere.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex items-center gap-4 flex-wrap">
//             <a
//               href="https://maps.google.com/?q=Calcutta+Sweets+Tatibandh+Raipur"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center px-7 py-3 rounded-full bg-[#6B3A12] text-white font-sans text-sm font-semibold hover:bg-[#5a3010] transition-colors shadow-md"
//             >
//               Get Directions
//             </a>
//             <a
//               href="tel:+919876543210"
//               className="inline-flex items-center px-7 py-3 rounded-full border-2 border-white/50 text-white font-sans text-sm font-semibold hover:bg-white hover:text-zinc-900 transition-colors backdrop-blur-sm"
//             >
//               Call the Store
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ── Experience Authenticity Section ── */}
//       <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28">
//         <div className="max-w-6xl mx-auto">
//           {/* Heading */}
//           <div className="text-center mb-16 md:mb-20">
//             <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 mb-4 italic">
//               Experience Authenticity
//             </h2>
//             <p className="font-sans text-sm sm:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto">
//               Our store is more than a shop; it is an invitation to witness the
//               heritage of Bengal. Breathe in the aroma of fresh cardamom and
//               watch our karigars at work.
//             </p>
//           </div>

//           {/* Feature Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {storeFeatures.map((feature) => (
//               <div key={feature.title} className="flex flex-col">
//                 {/* Image */}
//                 <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-sm">
//                   <Image
//                     src={feature.image}
//                     alt={feature.title}
//                     fill
//                     className="object-cover hover:scale-105 transition-transform duration-500"
//                     sizes="(max-width: 768px) 100vw, 33vw"
//                   />
//                 </div>

//                 {/* Text */}
//                 <h3 className="font-dm-serif text-lg sm:text-xl text-zinc-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="font-sans text-sm text-zinc-500 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Find Us in the Heart of Raipur ── */}
//       <FindUs />

//       {/* ── Stats Strip ── */}
//       <StoreStats />

//       {/* ── We'd Love to Welcome You ── */}
//       <WelcomeSection />
//     </main>
//   );
// }


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