import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";

const EXPLORE_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/visit-us", label: "Visit Us" },
  { href: "/celebration", label: "Celebrations" },
];

const CONTACT = {
  address: "Main Road, Tatibandh, Raipur, Chhattisgarh 492001",
  hours: "9 AM — 10 PM",
  email: "calcuttasweets@example.com",
  phone: "+91 99930 60082",
};

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1a1208] text-white">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.45fr] gap-10 lg:gap-10">

          <div className="flex flex-col justify-between gap-8 max-w-[420px]">

            {/* Brand Name*/}
            <div className="lg:-ml-6 xl:-ml-10">
              <h2 className="font-dm-serif text-[28px] sm:text-[32px] lg:text-[36px] tracking-wide leading-none">
                কলকত্তা SWEETS
              </h2>

              <p className="font-outfit text-[11px] uppercase tracking-[0.3em] text-white/40 mt-2">
                The Art of Bengali Mithai
              </p>

              <p className="mt-5 text-white/50 text-[14px] leading-relaxed max-w-[280px]">
                Bringing the legendary flavors of Bengal to the heart of Chhattisgarh since 2000.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-6">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-8 w-full">

            {/*Divider */}
            <div className="w-full h-0.25 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

              {/* Explore */}
              <div>
                <h3 className="font-dm-serif text-[20px] sm:text-[22px] mb-4">
                  Explore
                </h3>

                <ul className="space-y-2">
                  {EXPLORE_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/55 hover:text-white transition-colors duration-200 text-[14px] focus:outline-none focus:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">

                {/* Visit */}
                <div>
                  <h3 className="font-dm-serif text-[20px] sm:text-[22px] mb-2">
                    Visit Us
                  </h3>

                  <div className="max-w-[320px] lg:max-w-none">
                    <div>
                      <p className="text-white/55 text-[14px] leading-relaxed xl:whitespace-nowrap">
                        {CONTACT.address}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/40 text-[13px] mt-1">
                    {CONTACT.hours}
                  </p>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-dm-serif text-[20px] sm:text-[22px] mb-2">
                    Contact
                  </h3>

                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="block text-white/55 hover:text-white text-[14px] transition-colors duration-200"
                  >
                    {CONTACT.email}
                  </a>

                  <p className="text-white/55 text-[14px] mt-1">
                    {CONTACT.phone}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">

          <p className="text-[12px] text-white/25 tracking-wide lg:-ml-6 xl:-ml-10">
            © {year} কলকত্তা Sweets. All rights reserved.
          </p>

          <p className="text-[12px] text-white/20 tracking-wide">
            Raipur, Chhattisgarh
          </p>

        </div>
      </div>

    </footer >
  );
}