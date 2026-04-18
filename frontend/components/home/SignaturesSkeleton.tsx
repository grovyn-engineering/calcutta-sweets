export default function SignaturesSkeleton() {
  return (
    <section className="w-full bg-[#FEF7F2] py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="h-8 sm:h-11 md:h-12 w-[min(100%,280px)] rounded-full storefront-shimmer-surface" />
            <div className="h-9 sm:h-11 w-28 sm:w-36 shrink-0 rounded-full storefront-shimmer-surface" />
          </div>
          <div className="h-4 w-40 rounded-full storefront-shimmer-surface" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 lg:h-[650px]">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[320px] sm:h-[380px] lg:h-auto rounded-[2.5rem] storefront-shimmer-surface" />
          <div className="h-[220px] sm:h-[250px] lg:h-auto rounded-[2.5rem] storefront-shimmer-surface" />
          <div className="h-[220px] sm:h-[250px] lg:h-auto rounded-[2.5rem] storefront-shimmer-surface" />
          <div className="h-[220px] sm:h-[250px] lg:h-auto rounded-[2.5rem] storefront-shimmer-surface" />
          <div className="h-[220px] sm:h-[250px] lg:h-auto rounded-[2.5rem] storefront-shimmer-surface" />
        </div>
      </div>
    </section>
  );
}
