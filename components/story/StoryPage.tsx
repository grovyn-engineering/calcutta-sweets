import Link from "next/link";
import Image from "next/image";
import ArtOfCraft from "@/components/story/ArtOfCraft";
import Timeline from "@/components/story/Timeline";
import Family from "@/components/story/Family";
import Quote from "@/components/story/Quote";
import GiftCTA from "@/components/story/GiftCTA";

/**
 * Grid of sweet images mapping for the complex masonry layout
 */
const heroGridItems = [
  // Top Half
  { colSpan: "col-span-1", rowSpan: "row-span-2", src: "/images/sweet.jpg", title: "Cham Cham", subTitle: "Freshly Crafted Bengali", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet3.jpg", title: "Roshogolla", subTitle: "Classic Sweet", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet2.jpg", title: "Assorted Sweets", subTitle: "Festive Joy", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/malpua.png", title: "Malpua", subTitle: "Traditional Delight", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet5.jpg", title: "Payesh", subTitle: "Creamy Treat", delivery: "Delivery" },
  // Bottom Half
  { colSpan: "col-span-1", rowSpan: "row-span-2", src: "/images/sweet7.jpg", title: "Cham Cham", subTitle: "Freshly Crafted Bengali", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet6.jpg", title: "Roshogolla", subTitle: "Classic Sweet", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet4.jpg", title: "Assorted Sweets", subTitle: "Festive Joy", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet8.jpg", title: "Malpua", subTitle: "Traditional Delight", delivery: "Delivery" },
  { colSpan: "col-span-1", rowSpan: "row-span-1", src: "/images/sweet9.jpg", title: "Payesh", subTitle: "Creamy Treats", delivery: "Delivery" },
];

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#FEF7F2] overflow-x-hidden">
      {/* ── Hero Section ── */}
      <section className="relative w-full min-h-[90vh] flex items-center px-6 sm:px-10 pt-32 pb-20 lg:pt-40 lg:pb-32 lg:px-16 xl:px-24">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Text Content */}
          <div className="flex flex-col justify-center gap-6 max-w-xl w-full lg:w-[45%] shrink-0">
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#9A6B29]">
              Calcutta Sweets
            </span>

            <h1 className="font-dm-serif text-[4rem] sm:text-[5rem] lg:text-[5.5rem] text-[#2C1D13] leading-[1.05] tracking-tight">
              A Recipe
              <br />
              Older
              <br />
              Than Raipur
            </h1>

            <p className="font-sans text-base sm:text-[17px] text-[#5A4D40] leading-[1.8] max-w-md mb-2">
              Crafting the sacred proportions of Mishti requires more than
              patience. It demands a lineage of hands that understand the precise
              moment when milk turns to magic.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#9B6E2C] text-white font-sans text-sm font-bold hover:bg-[#855B22] transition-colors shadow-sm"
              >
                Explore Our Menu
              </Link>
              <Link
                href="/visit-us"
                className="inline-flex items-center px-8 py-3.5 rounded-full border border-[#D4C8BC] text-[#2D1B0F] font-sans text-sm font-bold hover:bg-[#F2E8DF] transition-colors"
              >
                Visit Us
              </Link>
            </div>
          </div>

          {/* Right — Photo Grid (3 Columns, 4 Rows) */}
          <div className="w-full lg:w-[55%] grid grid-cols-3 grid-rows-4 gap-3 lg:gap-4 h-[500px] sm:h-[600px] lg:h-[600px]">
            {heroGridItems.map((item, i) => (
              <div
                key={i}
                className={`relative ${item.colSpan} ${item.rowSpan} rounded-2xl lg:rounded-3xl overflow-hidden group shadow-sm`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />

                {/* Overlay only visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content only visible on hover */}
                <div className="absolute bottom-0 inset-x-0 p-4 lg:p-5 flex flex-col gap-1 items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between w-full">
                    <p className="font-dm-serif text-white text-lg lg:text-xl leading-tight">{item.title}</p>
                    <span className="text-white text-xs opacity-70">&gt;</span>
                  </div>
                  <p className="font-sans text-white/70 text-[10px] lg:text-[11px] leading-snug">{item.subTitle}</p>
                  <p className="font-sans text-white/50 text-[9px] lg:text-[10px]">{item.delivery}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Art of Hand-Kneaded Perfection ── */}
      <ArtOfCraft />

      {/* ── Our Journey Through Time ── */}
      <Timeline />

      {/* ── Three Generations, One Family ── */}
      <Family />

      {/* ── Founding Family Quote ── */}
      <Quote />

      {/* ── Gift a Legacy CTA ── */}
      <GiftCTA />

    </main>
  );
}
