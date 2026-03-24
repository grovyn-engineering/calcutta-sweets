"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global navigation links for the application.
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/celebration", label: "Celebrations" },
  { href: "/story", label: "Story" },
  { href: "/visit-us", label: "Visit Us" },
];

/**
 * Navbar component provides a responsive, sticky navigation header with 
 * scroll-aware styling and a mobile-friendly overlay menu.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle background transition and shadow based on vertical scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 80 : 64;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on component mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Primary navigation container with dynamic backdrop blurring and visibility */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] pointer-events-auto"
          : "bg-transparent border-transparent pointer-events-none"
      }`}>
        
        {/* Brand identity: Logo and establishment year */}
        <Link
          href="/"
          className="pointer-events-auto flex flex-col items-start gap-0.5 sm:gap-1 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 border border-transparent bg-transparent"
        >
          <span className="font-sans font-bold text-zinc-900 text-sm sm:text-xl leading-none tracking-wide">
            কলকत्ता SWEETS
          </span>
          <span className="font-sans text-[7px] sm:text-[10px] text-zinc-600 uppercase font-medium tracking-[0.2em] leading-none">
            EST 2000
          </span>
        </Link>

        {/* Desktop-only navigation links with active state tracking */}
        <div className={`pointer-events-auto hidden lg:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? "border border-transparent bg-transparent shadow-none"
            : "border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
        }`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            const isHome = pathname === '/' && link.href === '/';
            const trulyActive = isActive || isHome;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] sm:text-sm transition-colors ${trulyActive
                    ? "font-bold text-[#A67C46]"
                    : "font-medium text-zinc-800 hover:text-[#A67C46]/80"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action triggers: Mobile menu toggle */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2.5 rounded-full transition-all duration-300 text-zinc-800 hover:bg-white/90 ${
              isScrolled
                ? "border border-transparent bg-transparent shadow-none"
                : "border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            }`}
          >
            <Menu className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile navigation overlay with high-fidelity blur */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-4 p-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-md text-zinc-900 hover:bg-white/60"
          >
            <X className="w-5 h-5" />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-dm-serif text-4xl transition-colors ${pathname === link.href ? "text-[#A67C46]" : "text-zinc-900"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
