import Image from "next/image";
import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function FindUs() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-20 bg-[#FAF5F0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Map Illustration */}
        <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none lg:mx-0 rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-zinc-100">
          <Image
            src="/images/map-mockup.jpg" // Placeholder for an actual map graphic
            alt="Map location in Raipur"
            fill
            className="object-cover"
          />
          {/* Map Pin Overlay */}
          <div className="absolute top-[40%] left-[45%] flex items-center justify-center w-10 h-10 bg-[#B45309] rounded-full shadow-lg border-2 border-white">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#F6EDDF] text-[#D38B57] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] rounded-full">
              OUR FLAGSHIP LOCATION
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-[#3E2B1E] mb-12">
            Find us in the heart of Raipur
          </h2>

          {/* Info List */}
          <div className="flex flex-col gap-8">
            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#D38B57]" />
              </div>
              <div className="pt-1">
                <h3 className="font-sans font-bold text-sm text-[#3E2B1E] mb-1">
                  Address
                </h3>
                <p className="font-sans text-xs text-[#5A4F44] leading-relaxed">
                  Main Road, Tatibandh, <br />
                  Raipur, Chhattisgarh 492099
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#D38B57]" />
              </div>
              <div className="pt-1">
                <h3 className="font-sans font-bold text-sm text-[#3E2B1E] mb-1">
                  Contact
                </h3>
                <p className="font-sans text-xs text-[#5A4F44]">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#D38B57]" />
              </div>
              <div className="pt-1">
                <h3 className="font-sans font-bold text-sm text-[#3E2B1E] mb-1">
                  Hours
                </h3>
                <p className="font-sans text-xs text-[#5A4F44]">
                  9 AM – 10 PM | Monday – Sunday
                </p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-4 mt-10 pt-8 border-t border-black/5">
            <div className="w-6 h-6 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0">
              <Star className="w-3 h-3 text-[#D38B57] fill-[#D38B57]" />
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#D38B57]">
              FRESH BATCHES PREPARED TWICE DAILY
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
