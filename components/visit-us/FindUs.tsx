import { MapPin, Phone, Clock, Star } from "lucide-react";

export default function FindUs() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-20 bg-[#FAF5F0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Side: Map */}
        <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none lg:mx-0 rounded-2xl overflow-hidden shadow-sm border border-brand-brown/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.85!2d81.5775028!3d21.2592377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28de218cef56e9%3A0xe99b2422d3476171!2sCalcutta%20Sweets%20Tatibandh%20Raipur!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            title="Calcutta Sweets Tatibandh Raipur location"
          />
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
            <a href="https://www.google.com/maps/dir/?api=1&destination=Calcutta+Sweets+Tatibandh+Raipur" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
              <div className="w-10 h-10 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0 group-hover:bg-[#D38B57] transition-colors">
                <MapPin className="w-4 h-4 text-[#D38B57] group-hover:text-white transition-colors" />
              </div>
              <div className="pt-1">
                <h3 className="font-sans font-bold text-sm text-[#3E2B1E] mb-1">
                  Address
                </h3>
                <p className="font-sans text-xs text-[#5A4F44] leading-relaxed group-hover:text-[#D38B57] transition-colors">
                  Main Road, Tatibandh, <br />
                  Raipur, Chhattisgarh 492099
                </p>
              </div>
            </a>

            {/* Contact */}
            <a href="tel:+919993060082" className="flex items-start gap-5 group">
              <div className="w-10 h-10 rounded-full bg-[#F6EDDF] flex items-center justify-center shrink-0 group-hover:bg-[#D38B57] transition-colors">
                <Phone className="w-4 h-4 text-[#D38B57] group-hover:text-white transition-colors" />
              </div>
              <div className="pt-1">
                <h3 className="font-sans font-bold text-sm text-[#3E2B1E] mb-1">
                  Contact
                </h3>
                <p className="font-sans text-xs text-[#5A4F44] group-hover:text-[#D38B57] transition-colors">
                  +91 99930 60082
                </p>
              </div>
            </a>

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
          <div className="flex items-center gap-4 mt-10 pt-8 border-t border-brand-brown/5">
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