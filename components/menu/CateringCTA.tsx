import Link from "next/link";

const stats = [
  { value: "500+", label: "Orders Delivered" },
  { value: "3 Days", label: "Advance Booking" },
  { value: "100%", label: "Fresh Guarantee" },
  { value: "20+", label: "Sweet Varieties" },
];

export default function CateringCTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-zinc-900 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Text Content */}
            <div className="p-8 sm:p-10 md:p-14 flex flex-col justify-center">
              <h2 className="font-dm-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4">
                Planning a wedding
                <br />
                or gathering?
              </h2>
              <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                We cater to special occasions seamlessly with our bulk ordering
                and custom packaging services, making your celebrations truly
                unforgettable.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <Link
                  href="#"
                  className="px-6 py-3 rounded-full bg-foreground text-white font-sans text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-sans text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Download Brochure
                </Link>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-900 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center"
                >
                  <span className="font-dm-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
