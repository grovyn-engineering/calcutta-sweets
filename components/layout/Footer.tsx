"use client";

import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";

const exploreLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/visit-us", label: "Visit Us" },
  { href: "/celebration", label: "Celebrations" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1208] text-white">

      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main footer content */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20">

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-0 lg:justify-between lg:[&>*]:flex-1">

          <div className="flex flex-col items-start">
            {/* Logo */}
            <div className="flex flex-col items-start gap-[6px] mb-5">
              <span className="font-dm-serif text-white text-[32px] sm:text-[30px] lg:text-[36px] leading-none tracking-wide">
                কলকত্তা SWEETS
              </span>
              <span className="font-outfit text-[9px] sm:text-[9px] lg:text-[10px] text-white/40 uppercase tracking-[0.3em] leading-none">
                THE ART OF BENGALI MITHAI
              </span>
            </div>

            <p className="font-outfit text-[14px] sm:text-[13px] lg:text-[14px] text-white/50 leading-relaxed max-w-[260px] mb-7">
              Bringing the legendary flavors of Bengal to the heart of Chhattisgarh since 2000.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <Twitter className="w-3.5 h-3.5" strokeWidth={1.8} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-center lg:justify-self-center">
            <h3 className="font-dm-serif text-white text-[22px] sm:text-[20px] lg:text-[24px] tracking-[0.04em] mb-5">
              Explore
            </h3>
            <ul className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-outfit text-[14px] text-white/55 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start lg:items-center lg:justify-self-center">
            <h3 className="font-dm-serif text-white text-[22px] sm:text-[20px] lg:text-[24px] tracking-[0.04em] mb-5">
              Visit Us
            </h3>
            <p className="font-outfit text-[14px] text-white/55 leading-relaxed lg:text-center">
              Main Road, Tatibandh, Raipur, Chhattisgarh 492001
              <span className="mx-2 text-white/25">|</span>
              Open Daily: 9 AM – 10 PM
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end lg:justify-self-end">
            <h3 className="font-dm-serif text-white text-[22px] sm:text-[20px] lg:text-[24px] tracking-[0.04em] mb-5 w-full text-left lg:text-center">
              Contact Us
            </h3>
            <div className="flex flex-col items-start lg:items-center gap-2 w-full">
              <a
                href="mailto:calcuttasweets@example.com"
                className="font-outfit text-[14px] text-white/55 hover:text-white/90 transition-colors duration-200 text-left lg:text-center"
              >
                calcuttasweets@example.com
              </a>
              <p className="font-outfit text-[14px] text-white/55 text-left lg:text-center">
                +91 99930 60082
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-5 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-outfit text-[12px] text-white/25 tracking-wide">
          © {new Date().getFullYear()} কলকত্তা Sweets. All rights reserved.
        </p>
        <p className="font-outfit text-[12px] text-white/20 tracking-wide">
          Raipur, Chhattisgarh
        </p>
      </div>

    </footer>
  );
}