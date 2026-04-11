"use client";

import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="w-full bg-[#1a1208] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 lg:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-10">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">

            <div className="flex flex-col items-start gap-0">
              <Image
                src="/logowhite.svg"
                alt="Calcutta Sweets"
                width={260}
                height={112}
                className="h-16 sm:h-20 w-auto opacity-95 -ml-2"
              />

              <p className="font-outfit text-[11px] uppercase tracking-[0.3em] text-white/40 mt-2">
                The Art of Bengali Mithai
              </p>

              <p className="mt-5 text-white/50 text-sm leading-relaxed max-w-xs">
                Bringing the legendary flavors of Bengal to the heart of
                Chhattisgarh since 2000.
              </p>

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

          {/* RIGHT COLUMN */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-10">
            <div>
              <h3 className="font-dm-serif text-xl sm:text-[22px] mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-dm-serif text-xl sm:text-[22px] mb-2">
                  Visit Us
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {CONTACT.address}
                </p>
                <p className="text-white/40 text-[13px] mt-1">
                  {CONTACT.hours}
                </p>
              </div>

              <div>
                <h3 className="font-dm-serif text-xl sm:text-[22px] mb-2">
                  Contact
                </h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-white/55 hover:text-white text-sm transition-colors duration-200 [overflow-wrap:anywhere]"
                >
                  {CONTACT.email}
                </a>
                <p className="text-white/55 text-sm mt-1">
                  {CONTACT.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25 tracking-wide">
            © {year} <span lang="bn">কলকত্তা</span> Sweets. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wide">
            Raipur, Chhattisgarh
          </p>
        </div>
      </div>
    </footer>
  );
}