import Image from "next/image";
import { Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  href?: string;
}

export default function ProductCard({
  name,
  description,
  price,
  originalPrice,
  weight = "200g",
  rating = 4.9,
  reviewCount,
  image,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-5 flex-grow">
        {/* Star Rating */}
        {/* <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-amber-400 text-amber-400"
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="font-sans text-xs text-zinc-400 ml-1">
            ({rating})
          </span>
        </div> */}

        {/* Name */}
        <h3 className="font-dm-serif text-lg text-zinc-900 mb-1.5">{name}</h3>

        {/* Description */}
        <p className="font-sans text-zinc-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Price + Order Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="font-dm-serif text-lg text-zinc-900">
              ₹{price}
            </span>
            {originalPrice && (
              <span className="font-sans text-xs text-zinc-400 line-through">
                ₹{originalPrice}
              </span>
            )}
            <span className="font-sans text-xs text-zinc-400">/{weight}</span>
          </div>

          <button className="px-4 py-1.5 rounded-full bg-zinc-900 text-white font-sans font-medium text-xs hover:bg-zinc-800 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
