import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    name: "Festive Box",
    image: "/images/sweet10.jpg",
    price: 1200,
    tag: "LIMITED EDITION",
    description: "A grand collection of our top 12 signature sweets.",
  },
  {
    name: "Classic Box",
    image: "/images/sweet2.jpg",
    price: 850,
    tag: "BEST SELLER",
    description: "The essential trio: Sandesh, Roshogulla, and Doi.",
  },
  {
    name: "Joy of Gifting",
    image: "/images/sweet5.jpg",
    price: 1500,
    tag: "CELEBRATION",
    description: "Perfect assortment for your loved ones this season.",
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAF3E8]">
      <div className="max-w-6xl mx-auto">

        <div className="relative bg-[#F6F0E6] rounded-xl px-10 py-16 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">

          <div className="absolute inset-0 rounded-xl border border-brand-brown/10 pointer-events-none" />

          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif text-[#3E2F26] mb-3">
              Special Offers
            </h2>
            <p className="text-sm text-[#7A7A7A]">
              Check out our specially curated boxes for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.name}
                className="relative h-[380px] rounded-2xl overflow-hidden 
                shadow-[0_10px_25px_rgba(0,0,0,0.15)] 
                group transition-transform duration-300 hover:-translate-y-2"
              >
                <Image
                  src={offer.image}
                  alt={offer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E17]/90 via-[#2A1E17]/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">

                  <span className="absolute top-5 left-5 text-[10px] tracking-wide bg-[#D18B2F] text-white px-3 py-1 rounded-full font-semibold">
                    {offer.tag}
                  </span>

                  <h3 className="text-2xl font-serif text-white mb-2">
                    {offer.name}
                  </h3>

                  <p className="text-xs text-white/80 mb-5 max-w-[240px]">
                    {offer.description}
                  </p>

                  <Link href="/menu" className="w-full bg-white text-[#3E2F26] text-sm font-medium py-3 rounded-lg shadow-md hover:bg-[#f3f3f3] transition text-center block">
                    Buy for ₹{offer.price}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}