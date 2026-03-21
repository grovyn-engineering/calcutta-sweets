import Image from "next/image";
import Link from "next/link";

export default function GiftCTA() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
        {/* Left — Dark text panel */}
        <div className="bg-[#3A2D23] px-8 sm:px-16 md:px-24 py-20 lg:py-24 flex flex-col justify-center items-start">
          <h2 className="font-dm-serif text-[2.5rem] sm:text-[3rem] lg:text-[4rem] text-white leading-[1.15] mb-6">
            Gift a Legacy of
            <br />
            Pure Refinement
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] text-[#A69B91] leading-[1.7] mb-12 max-w-[420px]">
            Our heritage boxes are designed to preserve both the temperature and
            the tradition of our finest selections.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#69421A] border border-[#8C6234] text-white font-sans text-[15px] font-bold hover:bg-[#523314] transition-colors shadow-sm"
          >
            Curate Your Box
          </Link>
        </div>

        {/* Right — Gift box image */}
        <div className="relative min-h-[400px] lg:min-h-0 bg-[#DE9E62]">
          <Image
            src="/images/sweet4.jpg"
            alt="Heritage gift box"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
