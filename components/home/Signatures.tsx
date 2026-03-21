import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default async function Signatures() {
  const products = await getAllProducts();
  const featuredSweets = products.slice(0, 5); 

  return (
    <section className="w-full bg-[#FEF7F2] py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-dm-serif text-[28px] sm:text-[36px] md:text-[44px] text-[#2C1D13] uppercase tracking-wider leading-none">
              THE SIGNATURES
            </h2>
            <span className="font-sans text-[#A86F46] font-medium text-[15px]">
              Featured Collection
            </span>
          </div>

          <Link
            href="/menu?category=Signatures"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F5E8DC] text-[#4A3221] font-sans text-sm font-semibold hover:bg-[#E8D4C0] transition-colors"
          >
            View all items <span className="text-lg leading-none mb-0.5">→</span>
          </Link>
        </div>

        {/* 3-Column Asymmetrical Grid */}
        {featuredSweets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 lg:h-[650px]">
            {/* Item 1: Large left column */}
            {featuredSweets[0] && (
              <SignatureCard sweet={featuredSweets[0]} className="lg:row-span-2 h-[400px] lg:h-auto" />
            )}

            {/* Item 2: Mid Top */}
            {featuredSweets[1] && (
              <SignatureCard sweet={featuredSweets[1]} className="h-[250px] lg:h-auto" />
            )}

            {/* Item 3: Right Top */}
            {featuredSweets[2] && (
              <SignatureCard sweet={featuredSweets[2]} className="h-[250px] lg:h-auto" />
            )}

            {/* Item 4: Mid Bottom */}
            {featuredSweets[3] && (
              <SignatureCard sweet={featuredSweets[3]} className="h-[250px] lg:h-auto" />
            )}

            {/* Item 5: Right Bottom */}
            {featuredSweets[4] && (
              <SignatureCard sweet={featuredSweets[4]} className="h-[250px] lg:h-auto" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Sub-component for individual cards to cleanly handle hover states
function SignatureCard({ sweet, className }: { sweet: any, className?: string }) {
  return (
    <Link
      href={`/menu`}
      className={`relative w-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm block ${className}`}
    >
      <Image
        src={sweet.imageUrl || "/images/chamcham.png"}
        alt={sweet.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F110B]/95 via-[#1F110B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 sm:p-10 z-10">
        <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex flex-col gap-2">
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white">
              {sweet.name}
            </h3>
            <p className="font-sans text-[13px] text-white/80 max-w-[200px] leading-relaxed">
              {sweet.description || "Freshly Crafted Bengali Delicacy."}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-xl transition-colors hover:bg-white hover:text-black">
            ❯
          </div>
        </div>
      </div>
    </Link>
  );
}
