import Image from "next/image";
import { Map, Phone, Clock, ChevronRight } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="w-full bg-[#FAF5F0] px-4 md:px-8 lg:px-12 py-20 pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Welcome Text & Profile */}
        <div className="flex flex-col">
          <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2B1E] leading-[1.15] mb-8">
            We&apos;d Love to
            <br />
            Welcome You.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5A4F44] leading-relaxed max-w-md mb-12">
            Whether you&apos;re picking up a box of Sondesh for a celebration or just stopping by for your morning Roshogolla — our doors have been open since 1947 and will stay that way.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 relative shrink-0">
              <Image
                src="/images/profile.jpg" // Placeholder for manager profile
                alt="Mr. Antony"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm text-[#3E2B1E]">
                Mr. Antony
              </span>
              <span className="font-sans text-xs text-[#5A4F44]">
                Store Manager, Raipur Branch
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Info Cards */}
        <div className="flex flex-col gap-6">
          
          {/* Location Card */}
          <a href="https://www.google.com/maps/dir/?api=1&destination=Calcutta+Sweets+Tatibandh+Raipur" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Map className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  FIND US AT
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  Tatibandh Square, Raipur
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Call Us Card */}
          <a href="tel:+917714052300" className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  CALL US
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  +91 771-4052300
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Hours Card */}
          <div className="flex items-center justify-between w-full text-left p-4 sm:p-5 pr-6 sm:pr-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 transition-all duration-300 group">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#72532E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A68F7A]">
                  OPEN DAILY
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#534031]">
                  9:00 AM – 10:00 PM
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7563] group-hover:translate-x-1 transition-transform" />
          </div>

        </div>


      </div>
    </section>
  );
}
