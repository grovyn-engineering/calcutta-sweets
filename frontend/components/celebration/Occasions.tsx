import Image from "next/image";
import { MoveRight, Heart, Cake, Landmark, Flame, Briefcase } from "lucide-react";
import { fetchFromBackend } from "@/lib/serverFetch";

const FALLBACK_OCCASIONS = [
  { id: "fallback-weddings", title: "Weddings", image: "/images/wedding.png", iconName: "Heart" },
  { id: "fallback-birthdays", title: "Birthdays", image: "/images/birthday.png", iconName: "Cake" },
  { id: "fallback-puja", title: "Durga Puja", image: "/images/puja.png", iconName: "Landmark" },
  { id: "fallback-diwali", title: "Diwali", image: "/images/diwali.png", iconName: "Flame" },
  { id: "fallback-corporate", title: "Corporate", image: "/images/corporate.png", iconName: "Briefcase" },
];

const ICON_MAP: Record<string, any> = {
  Heart,
  Cake,
  Landmark,
  Flame,
  Briefcase
};

function mapOccasion(o: any) {
  if (o.iconName && !o.imageUrl) return o;

  return {
    id: o.id ?? `occ-${(o.title || "x").replace(/\s+/g, "-").toLowerCase()}`,
    title: o.title ?? "Occasion",
    image: o.imageUrl ?? o.image ?? "/images/default.png",
    iconName: o.iconKey ?? o.iconName ?? "Heart",
  };
}

export default async function Occasions() {
  const occasionsData = await fetchFromBackend<any[]>("/occasions", {
    fallback: FALLBACK_OCCASIONS,
  });

  const occasions = occasionsData.map(mapOccasion);

  return (
    <section className="w-full py-20 bg-[#ffffff]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="inline-flex flex-col">
          <h2 className="font-dm-serif text-3xl sm:text-[2.5rem] tracking-wide text-[#3E2B1E] mb-4">
            Curated for Every Occasion
          </h2>
          <div className="h-[1px] w-[60%] bg-[#D4C3B3] ml-2" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {occasions.map(({ id, title, image, iconName }) => {
            const Icon = ICON_MAP[iconName] || Heart;

            return (
              <div
                key={id}
                className="relative w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-[2rem] overflow-hidden group shadow-md transition-all duration-500 hover:-translate-y-4 hover:shadow-xl hover:shadow-brand-brown/10"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-brown/80 via-brand-brown/30 to-brand-brown/10" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start gap-1">
                  <Icon className="w-5 h-5 text-white/90 mb-1" strokeWidth={1.5} />

                  <h3 className="font-dm-serif text-xl sm:text-2xl text-white mb-2 tracking-wide">
                    {title}
                  </h3>

                  <a
                    href="#enquiry-form"
                    className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 bg-brand-brown/20 hover:bg-brand-brown/40 text-white text-[11px] font-sans transition-all backdrop-blur-sm"
                  >
                    Enquire Now <MoveRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}