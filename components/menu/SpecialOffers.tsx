import Image from "next/image";

const offers = [
  {
    name: "Festive Box",
    image: "/images/sandesh.png",
    price: 999,
  },
  {
    name: "Sweet Box",
    image: "/images/roshogulla.png",
    price: 1199,
  },
  {
    name: "Joy of Gifting",
    image: "/images/chamcham.png",
    price: 1499,
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F5EDE0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-zinc-900 mb-4">
            Special Offers
          </h2>
          <p className="font-sans text-zinc-500 text-sm max-w-lg mx-auto">
            Curated gift boxes specially assembled for festivals and celebrations.
            Perfect for sharing the sweetness.
          </p>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]"
            >
              {/* Background Image */}
              <Image
                src={offer.image}
                alt={offer.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-dm-serif text-2xl text-white mb-4">
                  {offer.name}
                </h3>
                <button className="self-start px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-sans text-sm font-medium hover:bg-white/30 transition-colors">
                  Buy at ₹{offer.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
