import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    quote: "Every bite feels like a trip to Kolkata. The balance of sweetness is perfect, just like how my Didun used to make it.",
    name: "Priya Sharma",
    title: "RAIPUR RESIDENT",
  },
  {
    quote: "Been coming here since childhood. The Malpua is consistent in taste even after 15 years. Truly Raipur's finest treasure.",
    name: "Rahul Agarwal",
    title: "LOYAL CUSTOMER",
  },
  {
    quote: "The Mishti Doi alone is worth the trip from Durg. Authentic ingredients and that earthen pot aroma is unbeatable.",
    name: "Ananya Sen",
    title: "FOOD BLOGGER",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#3D2B1F] py-24 px-8 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="font-sans text-[#C8773A] font-bold tracking-[0.15em] uppercase text-sm">
            WHAT PEOPLE SAY
          </span>
          <h2 className="font-dm-serif text-4xl lg:text-5xl text-[#FAF3E8] leading-tight">
            Loved across generations.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
