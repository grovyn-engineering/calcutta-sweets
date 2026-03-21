import Image from "next/image";
import { Leaf, ScrollText } from "lucide-react";

export default function Authenticity() {
  return (
    <section className="py-28 px-6 md:px-12 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT */}
          <div className="relative flex justify-center md:justify-start">

            {/* Main Arch Image */}
            <div
              className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[340px] sm:h-[400px] md:h-[460px] overflow-hidden shadow-xl mx-auto md:mx-0"
              style={{ borderRadius: "200px 200px 0 0" }}
            >
              <Image
                src="/images/shop1.jpg"
                alt="Traditional sweets preparation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Floating Circle */}
            <div className="absolute bottom-[-30px] sm:bottom-[-40px] left-[55%] sm:left-[60%] -translate-x-1/2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden border-[5px] sm:border-[6px] border-[#F6F4F0] shadow-2xl">
              <Image
                src="/images/sweet6.jpg"
                alt="Sweets"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col max-w-lg text-center md:text-left items-center md:items-start mt-8 md:mt-0">

            {/* Subtitle */}
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B47B2A] font-semibold mb-6">
              Since 2000
            </span>

            {/* Heading */}
            <h2 className="text-[32px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#3E2F26] mb-6 font-serif">
              Focusing on <br /> Authenticity
            </h2>

            {/* Paragraph */}
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-10">
              At Calcutta Sweets, we believe that the soul of a sweet lies in
              its ingredients. We source our milk from local farms and use
              traditional brass vessels to ensure that every batch retains the
              authentic flavor of Kolkata.
            </p>

            {/* Features */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">

              {/* Feature 1 */}
              <div className="flex flex-col gap-3">
                <Leaf className="w-5 h-5 text-[#B47B2A]" />
                <span className="text-sm font-semibold text-[#3E2F26]">
                  Natural Ingredients
                </span>
                <p className="text-xs text-[#8A8A8A] max-w-[180px] leading-relaxed">
                  Pure cow milk and organic sweeteners only.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-3">
                <ScrollText className="w-5 h-5 text-[#B47B2A]" />
                <span className="text-sm font-semibold text-[#3E2F26]">
                  Heritage Recipes
                </span>
                <p className="text-xs text-[#8A8A8A] max-w-[180px] leading-relaxed">
                  Passed down through generations of Karigars.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}