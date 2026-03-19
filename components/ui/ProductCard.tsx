import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  href?: string;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-zinc-900">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Price Tag Pill */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full z-10">
          <span className="font-sans font-medium text-sm text-zinc-800">
            ₹{price}/pc
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 flex-grow">
        <h3 className="font-dm-serif text-3xl text-zinc-900 mb-3">{name}</h3>
        <p className="font-sans text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-auto">
          <Link
            href={href}
            className="flex-1 text-center py-3 rounded-full border border-foreground text-foreground font-sans font-medium text-sm hover:bg-foreground/5 transition-colors"
          >
            Get Details
          </Link>
          <Link
            href={href}
            className="flex-1 text-center py-3 rounded-full bg-[#C8773A] text-white font-sans font-medium text-sm hover:bg-[#b06832] transition-colors shadow-sm"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
