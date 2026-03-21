import { ClipboardEdit, Palette, CookingPot, Truck } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Enquire & Select",
      description: "Fill the form or call us to share your event details and sweet preferences.",
      icon: ClipboardEdit,
    },
    {
      number: "02",
      title: "Customize",
      description: "Choose flavors, packaging styles, and personalized branding options.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Freshly Prepared",
      description: "Our Karigars craft your order 6 hours prior to delivery for maximum freshness.",
      icon: CookingPot,
    },
    {
      number: "04",
      title: "Timely Delivery",
      description: "Carefully packed and shipped to your venue via our temperature-controlled fleet.",
      icon: Truck,
    },
  ];

  return (
    <section className="w-full py-24 bg-[#FEF7F2]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-dm-serif text-3xl sm:text-4xl md:text-[2.5rem] text-[#2C1D13] mb-4 tracking-wide">
            Seamless Celebrations
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative lg:px-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="relative bg-[#FFFDFA] rounded-[2rem] p-6 lg:p-8 border border-[#F4EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between min-h-[260px]"
              >
                {/* Top Row: Icon and Number */}
                <div className="flex items-start justify-between w-full mb-8">
                  {/* Icon */}
                  <div className="text-[#A27339] mt-2">
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <div className="font-dm-serif text-[4rem] lg:text-[5rem] text-[#F1E7DD] leading-[0.8] select-none">
                    {step.number}
                  </div>
                </div>
                
                {/* Bottom Row: Text Content */}
                <div className="mt-auto">
                  <h3 className="font-sans font-extrabold text-[#2C1D13] text-sm lg:text-[15px] tracking-wide mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[11px] lg:text-xs text-[#7D7063] leading-[1.8]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
