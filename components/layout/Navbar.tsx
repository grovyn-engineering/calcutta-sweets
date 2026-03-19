import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      {/* Left: Logo */}
      <Link href="/" className="flex flex-col items-start gap-1">
        <span className="font-sans font-bold text-foreground text-xl leading-none tracking-wide">
          कलकत्ता SWEETS
        </span>
        <span className="font-sans text-[10px] text-foreground/70 uppercase font-medium tracking-[0.2em] leading-none">
          EST 2000
        </span>
      </Link>

      {/* Center: Navigation Pill */}
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
      <div className="flex items-center gap-4">
        {/* Search Button */}
        <button
          aria-label="Search"
          className="p-2.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors"
        >
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Cart Button */}
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-foreground/5 transition-colors">
          <span className="font-sans text-sm font-bold">Cart</span>
          <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
