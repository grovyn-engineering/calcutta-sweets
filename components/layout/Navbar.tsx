"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5">
        {/* Left: Logo */}
        <Link href="/" className="flex flex-col items-start gap-0.5 sm:gap-1">
          <span className="font-sans font-bold text-foreground text-base sm:text-xl leading-none tracking-wide">
            कलकत्ता SWEETS
          </span>
          <span className="font-sans text-[8px] sm:text-[10px] text-foreground/70 uppercase font-medium tracking-[0.2em] leading-none">
            EST 2000
          </span>
        </Link>

        {/* Center: Navigation Pill (desktop) */}
        <div className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md">
          <Link
            href="/"
            className="font-sans text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="font-sans text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            About Us
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Button */}
          <button
            aria-label="Search"
            className="p-2 sm:p-2.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
          </button>

          {/* Cart Button */}
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors">
            <span className="font-sans text-sm font-bold">Cart</span>
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
          </button>

          {/* Mobile Cart (icon only) */}
          <button
            aria-label="Cart"
            className="sm:hidden p-2 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
          </button>

          {/* Mobile Hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Menu className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-4 p-2 rounded-full border border-foreground/20 text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="font-dm-serif text-3xl text-foreground"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMobileOpen(false)}
            className="font-dm-serif text-3xl text-foreground"
          >
            Menu
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="font-dm-serif text-3xl text-foreground"
          >
            About Us
          </Link>
        </div>
      )}
    </>
  );
}
