"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
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
    const handleScroll = () => {
      // 4rem = 64px
      setIsScrolled(window.scrollY > 64);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 pointer-events-none">
        {/* Left: Logo */}
        <Link
          href="/"
          className={`pointer-events-auto flex flex-col items-start gap-0.5 sm:gap-1 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          <span className="font-sans font-bold text-zinc-900 text-sm sm:text-xl leading-none tracking-wide">
            কলकत्ता SWEETS
          </span>
          <span className="font-sans text-[7px] sm:text-[10px] text-zinc-600 uppercase font-medium tracking-[0.2em] leading-none">
            EST 2000
          </span>
        </Link>

        {/* Center: Navigation Pill (desktop) */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-8 px-8 py-3 rounded-full border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            const isHome = pathname === '/' && link.href === '/';
            const trulyActive = isActive || isHome;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] sm:text-sm transition-colors ${
                  trulyActive
                    ? "font-bold text-[#A67C46]"
                    : "font-medium text-zinc-800 hover:text-[#A67C46]/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4">
          {/* Search Button */}
          <button
            aria-label="Search"
            className="p-3 sm:p-3.5 rounded-full border border-white/60 bg-white/70 backdrop-blur-md text-zinc-800 hover:bg-white/90 transition-colors shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
          >
            <Search className="w-4 h-4 sm:w-4 sm:h-4" strokeWidth={2.5} />
          </button>

          {/* Order Now Button */}
          <Link
            href="/menu"
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 h-[40px] sm:h-[46px] rounded-full bg-[#CA793E] hover:bg-[#B36832] transition-colors shadow-[0_8px_16px_rgb(202,121,62,0.25)]"
          >
            <span className="font-sans text-[13px] sm:text-sm font-medium text-white">Order Now</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2.5 rounded-full border border-white/60 bg-white/70 backdrop-blur-md text-zinc-800 hover:bg-white/90 transition-colors shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
          >
            <Menu className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-4 p-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-md text-zinc-900 hover:bg-white/60"
          >
            <X className="w-5 h-5" />
          </button>

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`font-dm-serif text-4xl transition-colors ${pathname === "/" ? "text-[#A67C46]" : "text-zinc-900"
              }`}
          >
            Home
          </Link>

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
