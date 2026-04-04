"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/celebration", label: "Celebrations" },
  { href: "/story", label: "Story" },
  { href: "/visit-us", label: "Visit Us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.getElementById("hero");

    // Fallback 
    if (!hero) {
      const handleScrollFallback = () => {
        const overThreshold = window.scrollY > 60;
        setIsScrolled((prev) => (prev !== overThreshold ? overThreshold : prev));
      };
      window.addEventListener("scroll", handleScrollFallback, { passive: true });
      handleScrollFallback();
      return () => window.removeEventListener("scroll", handleScrollFallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const overThreshold = !entry.isIntersecting;
        setIsScrolled((prev) => (prev !== overThreshold ? overThreshold : prev));
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center">

          {/* Logo*/}
          <Link
            href="/"
            className="flex flex-col items-start gap-[3px] group"
          >
            <span className="font-sans font-bold text-brand-brown text-[16px] sm:text-[19px] leading-none tracking-wide group-hover:opacity-80 transition-opacity duration-200">
              কলকत्ता SWEETS
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] text-zinc-400 uppercase font-semibold tracking-[0.25em] leading-none">
              EST 2000
            </span>
          </Link>

          {/* RIGHT SIDE*/}
          <div className="ml-auto flex items-center">

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (pathname.startsWith(link.href) && link.href !== "/");
                const isHome = pathname === "/" && link.href === "/";
                const trulyActive = isActive || isHome;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-sans text-[14px] px-2 py-1 transition-all duration-200 ${trulyActive
                      ? "font-semibold text-[#A67C46]"
                      : "font-medium text-brand-brown hover:text-[#A67C46]"
                      }`}
                  >
                    {link.label}

                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-2px] h-[1px] bg-[#A67C46] transition-all duration-300 ${trulyActive ? "w-[60%] opacity-100" : "w-0 opacity-0"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Button */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden ml-4 flex items-center justify-center w-9 h-9 text-brand-brown hover:text-[#A67C46] transition-colors duration-200"
            >
              <Menu className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A67C46]/15 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"
            }`}
        />
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${mobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-white/90 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-2 px-8">

          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/60 text-brand-brown hover:bg-white transition-colors duration-200"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>

          <div className="absolute top-5 left-6 flex flex-col gap-[3px]">
            <span className="font-sans font-bold text-brand-brown text-[13px] leading-none tracking-wide">
              কলকत्ता SWEETS
            </span>
            <span className="font-sans text-[7px] text-zinc-400 uppercase font-semibold tracking-[0.25em] leading-none">
              EST 2000
            </span>
          </div>

          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
              className={`font-dm-serif text-[40px] leading-tight tracking-tight transition-all duration-300 ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${pathname === link.href
                  ? "text-[#A67C46]"
                  : "text-brand-brown hover:text-[#A67C46]/80"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-px bg-[#A67C46]/20" />
        </div>
      </div>
    </>
  );
}