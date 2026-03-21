import Link from "next/link";

const stats = [
  { value: "500+", label: "ORDERS MONTHLY" },
  { value: "3 Days", label: "ADVANCE BOOKING" },
  { value: "100%", label: "PURE DESI GHEE" },
  { value: "20+", label: "AWARDED RECIPES" },
];

export default function CateringCTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-[#FAF3E8]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3E2F26] leading-tight mb-4">
            Planning a wedding or gathering?
          </h2>

          <p className="text-sm text-[#6F6F6F] leading-relaxed mb-8 max-w-md">
            Make your special occasions even sweeter with our bulk catering
            services. We offer customized packaging and fresh delivery for
            events of all sizes.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#"
              className="px-6 py-3 rounded-full bg-[#4B2E1E] text-white text-sm font-medium hover:bg-[#3b2417] transition"
            >
              Enquire Now
            </Link>

            <Link
              href="#"
              className="px-6 py-3 rounded-full border border-[#4B2E1E] text-[#4B2E1E] text-sm font-medium hover:bg-[#4B2E1E]/10 transition"
            >
              Download Brochure
            </Link>
          </div>
        </div>

        {/* RIGHT STATS CARD */}
        <div className="relative">
          <div className="rounded-2xl bg-gradient-to-br from-[#4B2E1E] to-[#2E1B12] text-white p-8 md:p-10 shadow-xl">
            
            <div className="grid grid-cols-2">
              
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-6 flex flex-col items-center text-center ${
                    index === 0 ? "border-b border-r border-white/10" :
                    index === 1 ? "border-b border-white/10" :
                    index === 2 ? "border-r border-white/10" : ""
                  }`}
                >
                  <span className="text-2xl md:text-3xl font-semibold text-[#F0A23A] mb-2">
                    {stat.value}
                  </span>

                  <span className="text-[10px] tracking-widest text-white/60 uppercase">
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
