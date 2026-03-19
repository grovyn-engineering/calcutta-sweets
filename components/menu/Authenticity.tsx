// import Image from "next/image";
// import { Leaf, ScrollText } from "lucide-react";

// export default function Authenticity() {
//   return (
//     <section className="py-24 px-6 md:px-12">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//           {/* Left: Arch Image Composition */}
//           <div className="relative flex justify-center">
//             {/* Arch-shaped main image */}
//             <div
//               className="relative w-[340px] h-[420px] overflow-hidden"
//               style={{ borderRadius: "170px 170px 0 0" }}
//             >
//               <Image
//                 src="/images/malpua.png"
//                 alt="Artisan hand-crafting traditional Bengali sweets"
//                 fill
//                 className="object-cover"
//                 sizes="340px"
//               />
//               {/* Subtle dark overlay for depth */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//             </div>

//             {/* Floating circular accent image */}
//             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-[5px] border-background shadow-xl z-10">
//               <Image
//                 src="/images/sandesh.png"
//                 alt="Assorted Bengali sweets close-up"
//                 fill
//                 className="object-cover"
//                 sizes="160px"
//               />
//             </div>
//           </div>

//           {/* Right: Content */}
//           <div className="flex flex-col">
//             <span className="font-sans text-xs uppercase tracking-[0.25em] text-foreground font-semibold mb-5">
//               Since 2000
//             </span>
//             <h2 className="font-dm-serif text-4xl md:text-5xl text-zinc-900 leading-[1.15] mb-6">
//               Focusing on
//               <br />
//               Authenticity
//             </h2>
//             <p className="font-sans text-zinc-500 text-sm leading-relaxed mb-10 max-w-md">
//               At Calcutta Sweets, we believe that the soul of a sweet lies in
//               its ingredients. We source our milk from local farms and use
//               traditional brass vessels to ensure that every batch retains the
//               authentic flavor of Kolkata.
//             </p>

//             {/* Feature Badges with Descriptions */}
//             <div className="flex items-start gap-10">
//               {/* Natural Ingredients */}
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center gap-3">
//                   <Leaf className="w-5 h-5 text-foreground" strokeWidth={2} />
//                   <span className="font-sans text-sm font-bold text-zinc-900">
//                     Natural Ingredients
//                   </span>
//                 </div>
//                 <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-[200px]">
//                   Pure cow milk and organic sweeteners only.
//                 </p>
//               </div>

//               {/* Heritage Recipes */}
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center gap-3">
//                   <ScrollText
//                     className="w-5 h-5 text-foreground"
//                     strokeWidth={2}
//                   />
//                   <span className="font-sans text-sm font-bold text-zinc-900">
//                     Heritage Recipes
//                   </span>
//                 </div>
//                 <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-[200px]">
//                   Passed down through generations of Karigars.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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
                src="/images/malpua.png"
                alt="Traditional sweets preparation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Floating Circle */}
            <div className="absolute bottom-[-30px] sm:bottom-[-40px] left-[55%] sm:left-[60%] -translate-x-1/2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden border-[5px] sm:border-[6px] border-[#F6F4F0] shadow-2xl">
              <Image
                src="/images/sandesh.png"
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