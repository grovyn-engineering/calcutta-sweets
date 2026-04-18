"use client";

import { useCallback, useEffect, useState } from "react";
import { MoveRight, Heart, Cake, Landmark, Flame, Briefcase } from "lucide-react";
import FilledImageWithShimmer from "@/components/ui/FilledImageWithShimmer";
import { OccasionsSectionSkeleton } from "@/components/ui/StorefrontSkeletons";

const ICON_MAP: Record<string, typeof Heart> = {
  Heart,
  Cake,
  Landmark,
  Flame,
  Briefcase,
};

function mapOccasion(o: Record<string, unknown>) {
  return {
    id: (o.id as string) ?? `occ-${String(o.title || "x").replace(/\s+/g, "-").toLowerCase()}`,
    title: (o.title as string) ?? "Occasion",
    image: (o.imageUrl as string) ?? (o.image as string) ?? "/images/default.png",
    iconName: (o.iconKey as string) ?? (o.iconName as string) ?? "Heart",
  };
}

async function fetchOccasions(): Promise<ReturnType<typeof mapOccasion>[]> {
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not configured");

  const res = await fetch(`${base}/occasions`, { cache: "no-store" });
  const json = (await res.json()) as { success?: boolean; data?: unknown; message?: string };

  if (!res.ok || !json || json.success !== true || !Array.isArray(json.data)) {
    throw new Error(typeof json.message === "string" ? json.message : `Request failed (${res.status})`);
  }

  return json.data.map((row) => mapOccasion(row as Record<string, unknown>));
}

export default function Occasions() {
  const [occasions, setOccasions] = useState<ReturnType<typeof mapOccasion>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOccasions(await fetchOccasions());
    } catch (e) {
      setOccasions([]);
      setError(e instanceof Error ? e.message : "Could not load occasions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <OccasionsSectionSkeleton />;
  }

  return (
    <section className="w-full py-20 bg-[#ffffff]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="inline-flex flex-col">
          <h2 className="font-dm-serif text-3xl sm:text-[2.5rem] tracking-wide text-[#3E2B1E] mb-4">
            Curated for Every Occasion
          </h2>
          <div className="h-[1px] w-[60%] bg-[#D4C3B3] ml-2" />
        </div>
        {error ? (
          <p className="mt-4 text-sm text-amber-900 bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-3 max-w-xl">
            {error}
          </p>
        ) : null}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        {occasions && occasions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
            {occasions.map(({ id, title, image, iconName }) => {
              const Icon = ICON_MAP[iconName] || Heart;

              return (
                <div
                  key={id}
                  className="relative w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-[2rem] overflow-hidden group shadow-md transition-all duration-500 hover:-translate-y-4 hover:shadow-xl hover:shadow-brand-brown/10"
                >
                  <FilledImageWithShimmer
                    key={image}
                    src={image}
                    alt={title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
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
        ) : !error ? (
          <p className="font-sans text-sm text-[#6B5344]">
            No occasions yet. Add them in <span className="font-semibold">Admin → Celebrations</span>.
          </p>
        ) : null}
      </div>
    </section>
  );
}
