import Image from "next/image";

const stats = [
  { value: "EST 2000", label: "PIONEERING TRADITION" },
  { value: "40+ VARIETIES", label: "ARTISANAL RECIPES" },
  { value: "3 GENERATIONS", label: "FAMILY LEGACY" },
  { value: "CALCUTTA'S FINEST", label: "LOCAL FAVORITE" },
];

export default function OurStory() {
  return (
    <section className="w-full flex flex-col">
      {/* Dark Statistics Banner */}
      <div 
        className="w-full py-12 px-8 flex justify-center items-center"
        style={{ background: "linear-gradient(to right, #3D2B1F, #241409)" }}
      >
        <div className="w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center pt-8 lg:pt-0 first:pt-0 px-4 text-center">
              <span className="font-dm-serif text-2xl text-[#FAF3E8] mb-1">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#C8773A]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Layout */}
      <div className="w-full bg-[var(--background)] py-24 px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-sans text-[#C8773A] font-bold tracking-[0.15em] mb-6 uppercase text-sm">
              Our Story
            </h3>
            
            <h2 className="font-dm-serif text-4xl lg:text-5xl text-[#3D2B1F] leading-[1.2] mb-8">
              A small counter in <br className="hidden lg:block"/>
              <span className="text-[#C8773A]">Tatibandh</span>, a Grandmother's<br className="hidden lg:block"/>
              recipe diary.
            </h2>
            
            <p className="font-sans text-zinc-600 text-lg leading-relaxed mb-10 max-w-xl">
              Three generations of recipes handed down through whispers and wooden spoons. What started as a humble stall in the heart of Raipur has grown into a destination for those who seek the authentic taste of Bengal.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-8 py-3.5 rounded-full bg-[#C8773A] text-white font-sans font-medium text-sm hover:bg-[#b06832] transition-colors shadow-sm">
                Get the Recipe Book
              </button>
              <button className="px-8 py-3.5 rounded-full border border-black/20 text-[#3D2B1F] font-sans font-medium text-sm hover:bg-black/5 transition-colors">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-[5/4] max-w-2xl mx-auto">
            {/* Floating Badge */}
            <div className="absolute -top-8 -left-8 lg:-top-12 lg:-left-12 z-20 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-[#C8773A] border-[6px] border-[var(--background)] shadow-xl flex flex-col items-center justify-center text-white">
              <span className="font-sans text-[10px] uppercase tracking-widest font-medium opacity-90 mb-0.5">
                EST.
              </span>
              <span className="font-dm-serif text-2xl lg:text-3xl">
                2000
              </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200" 
                alt="Traditional sweets assortment on a brass plate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
