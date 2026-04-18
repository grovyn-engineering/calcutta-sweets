/** Shared loading placeholders for public storefront (match `storefront-shimmer-surface` in globals.css). */

export function MenuProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      aria-busy="true"
      aria-label="Loading menu"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100/80"
        >
          <div className="relative aspect-[4/3] w-full storefront-shimmer-surface" />
          <div className="flex flex-col p-5 gap-3">
            <div className="h-5 w-3/4 rounded-lg storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-5/6 rounded storefront-shimmer-surface" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 w-20 rounded-md storefront-shimmer-surface" />
              <div className="h-8 w-24 rounded-full storefront-shimmer-surface" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OccasionsSectionSkeleton() {
  return (
    <section className="w-full py-20 bg-[#ffffff]" aria-busy="true" aria-label="Loading occasions">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="inline-flex flex-col gap-4 w-full max-w-lg">
          <div className="h-10 sm:h-12 w-full rounded-2xl storefront-shimmer-surface" />
          <div className="h-px w-[60%] storefront-shimmer-surface opacity-70" />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-[2rem] storefront-shimmer-surface"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessStepsSkeleton() {
  return (
    <section className="w-full bg-[#FEF7F2] py-24" aria-busy="true" aria-label="Loading steps">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="mb-16 flex justify-center">
          <div className="h-10 w-[min(100%,320px)] rounded-2xl storefront-shimmer-surface" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[260px] rounded-[2rem] border border-[#F4EBE3] bg-[#FFFDFA] p-6 lg:p-8 shadow-sm"
            >
              <div className="mb-8 flex justify-between">
                <div className="h-7 w-7 rounded-lg storefront-shimmer-surface" />
                <div className="h-12 w-14 rounded-lg storefront-shimmer-surface" />
              </div>
              <div className="space-y-3 mt-auto pt-8">
                <div className="h-4 w-4/5 rounded storefront-shimmer-surface" />
                <div className="h-3 w-full rounded storefront-shimmer-surface" />
                <div className="h-3 w-full rounded storefront-shimmer-surface" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryPageSkeleton() {
  return (
    <main
      className="min-h-screen bg-[#FEF7F2] overflow-x-hidden"
      aria-busy="true"
      aria-label="Loading story"
    >
      <section className="relative w-full bg-[#F5EDE6] px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 sm:pt-32 lg:pt-36 pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="h-3 w-32 rounded-full storefront-shimmer-surface" />
            <div className="space-y-3">
              <div className="h-12 w-full max-w-md rounded-xl storefront-shimmer-surface" />
              <div className="h-12 w-full max-w-sm rounded-xl storefront-shimmer-surface" />
            </div>
            <div className="space-y-2 max-w-md">
              <div className="h-3 w-full rounded storefront-shimmer-surface" />
              <div className="h-3 w-full rounded storefront-shimmer-surface" />
              <div className="h-3 w-4/5 rounded storefront-shimmer-surface" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-11 w-36 rounded-full storefront-shimmer-surface" />
              <div className="h-11 w-32 rounded-full storefront-shimmer-surface" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="h-[400px] sm:h-[480px] lg:h-[550px] rounded-2xl storefront-shimmer-surface" />
          </div>
        </div>
      </section>
      <div className="h-32 bg-white/50" />
    </main>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="relative z-20 pt-4 pb-4 space-y-10" aria-busy="true" aria-label="Loading timeline">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col md:flex-row gap-4 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
        >
          <div className="w-full md:w-5/12 space-y-3 pl-20 md:pl-0">
            <div className="h-8 w-24 rounded-lg storefront-shimmer-surface" />
            <div className="h-6 w-3/4 rounded-lg storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
          </div>
          <div className="hidden md:block md:w-5/12" />
        </div>
      ))}
    </div>
  );
}

export function TestimonialsSectionSkeleton() {
  return (
    <section
      className="w-full bg-[#3D2B1F] py-24 px-8 md:px-12 lg:px-24"
      aria-busy="true"
      aria-label="Loading testimonials"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-20 flex flex-col items-center gap-4 w-full max-w-lg">
          <div className="h-4 w-40 rounded-full storefront-shimmer-surface opacity-90" />
          <div className="h-10 w-full rounded-2xl storefront-shimmer-surface opacity-90" />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[220px] rounded-2xl border border-white/10 bg-white/5 p-8 storefront-shimmer-surface opacity-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitFeatureCardsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
      aria-busy="true"
      aria-label="Loading highlights"
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white border border-brand-brown/5">
          <div className="h-[220px] sm:h-[240px] lg:h-[260px] storefront-shimmer-surface" />
          <div className="p-5 sm:p-6 space-y-3">
            <div className="h-5 w-2/3 rounded-lg storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-5/6 rounded storefront-shimmer-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VisitHeroBannerSkeleton() {
  return (
    <div className="relative w-full overflow-hidden rounded-md" aria-busy="true" aria-label="Loading hero">
      <div className="w-full aspect-[16/9] sm:aspect-[21/9] storefront-shimmer-surface min-h-[200px]" />
    </div>
  );
}

export function StoreStatsSkeleton() {
  return (
    <section className="w-full border-y border-[#3E2B1E]/10 bg-[#FAF5F0]" aria-busy="true" aria-label="Loading stats">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 md:px-16 lg:px-24 md:py-16">
        <div className="grid grid-cols-1 gap-0 text-center md:grid-cols-3 md:divide-x md:divide-[#3E2B1E]/10">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-3 py-8 md:py-0 ${
                idx !== 0 ? "border-t border-[#3E2B1E]/10 md:border-t-0" : ""
              }`}
            >
              <div className="h-9 w-28 rounded-lg storefront-shimmer-surface mx-auto" />
              <div className="h-3 w-36 rounded-full storefront-shimmer-surface mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main
      className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-screen bg-white"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="h-4 w-32 rounded-full storefront-shimmer-surface mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="aspect-square w-full max-w-xl mx-auto lg:mx-0 rounded-2xl storefront-shimmer-surface" />
        <div className="space-y-6 pt-2">
          <div className="h-10 w-4/5 rounded-xl storefront-shimmer-surface" />
          <div className="h-6 w-32 rounded-lg storefront-shimmer-surface" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-4/5 rounded storefront-shimmer-surface" />
          </div>
          <div className="h-12 w-40 rounded-full storefront-shimmer-surface" />
        </div>
      </div>
    </main>
  );
}

export function OurStoryFullSkeleton() {
  return (
    <section className="w-full flex flex-col" aria-busy="true" aria-label="Loading our story">
      <div
        className="w-full py-10 px-6 flex justify-center items-center"
        style={{ background: "linear-gradient(to right, #3D2B1F, #241409)" }}
      >
        <div className="w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-8 px-4 gap-2">
              <div className="h-8 w-24 rounded-lg storefront-shimmer-surface opacity-80" />
              <div className="h-3 w-20 rounded-full storefront-shimmer-surface opacity-60" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-[var(--background)] py-24 px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="h-4 w-24 rounded-full storefront-shimmer-surface" />
            <div className="h-12 w-full max-w-lg rounded-2xl storefront-shimmer-surface" />
            <div className="h-12 w-full max-w-md rounded-2xl storefront-shimmer-surface" />
            <div className="space-y-2 max-w-xl">
              <div className="h-3 w-full rounded storefront-shimmer-surface" />
              <div className="h-3 w-full rounded storefront-shimmer-surface" />
              <div className="h-3 w-3/4 rounded storefront-shimmer-surface" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-40 rounded-full storefront-shimmer-surface" />
              <div className="h-12 w-36 rounded-full storefront-shimmer-surface" />
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-[5/4] max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto rounded-2xl lg:rounded-[2rem] storefront-shimmer-surface" />
        </div>
      </div>
    </section>
  );
}

export function WelcomeSectionSkeleton() {
  return (
    <section className="w-full bg-[#FAF5F0] px-4 md:px-8 lg:px-12 py-20 pb-32" aria-busy="true" aria-label="Loading welcome">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex flex-col gap-6">
          <div className="h-12 w-full max-w-md rounded-2xl storefront-shimmer-surface" />
          <div className="h-12 w-full max-w-sm rounded-2xl storefront-shimmer-surface" />
          <div className="space-y-2 max-w-md">
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
            <div className="h-3 w-full rounded storefront-shimmer-surface" />
          </div>
          <div className="h-24 w-full max-w-sm rounded-xl storefront-shimmer-surface" />
        </div>
        <div className="h-[340px] rounded-2xl storefront-shimmer-surface" />
      </div>
    </section>
  );
}
