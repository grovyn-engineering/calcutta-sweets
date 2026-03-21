"use client";

import Link from "next/link";
import { Twitter, Instagram, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C0F07] pt-20 pb-8 px-8 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start gap-1 mb-6">
              <span className="font-dm-serif text-white text-3xl leading-none tracking-wide">
                কলकत्ता SWEETS
              </span>
              <span className="font-sans text-[10px] text-white/50 uppercase font-medium tracking-[0.2em] leading-none">
                THE ART OF BENGALI MITHAI
              </span>
            </Link>
            <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Bringing the legendary flavors of Bengal to the heart of Chhattisgarh since 2000.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-dm-serif text-white text-xl mb-6">Explore</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Menu', href: '/menu' },
                { name: 'Story', href: '/story' },
                { name: 'Visit Us', href: '/visit-us' },
                { name: 'Celebrations', href: '/celebration' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="font-sans text-white/60 text-sm hover:text-white transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Visit Us */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-dm-serif text-white text-xl mb-6">Visit Us</h4>
            <div className="flex flex-col gap-4 font-sans text-white/60 text-sm leading-relaxed">
              <p>
                Main Road, Tatibandh,<br />
                Raipur, Chhattisgarh<br />
                492001
              </p>
              <p className="mt-2">+91 98765 43210</p>
              <p>Open Daily: 9 AM - 10 PM</p>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-dm-serif text-white text-xl mb-6">Stay Sweet.</h4>
            <p className="font-sans text-white/60 text-sm mb-6">
              Join our list for seasonal specials.
            </p>
            <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="p-2.5 rounded-full bg-[#3D2B1F] border border-white/10 text-white hover:bg-[#4A3525] transition-colors flex-shrink-0"
                aria-label="Subscribe"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 font-sans text-xs text-white/40">
            <Link href="#" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/80 transition-colors">Terms of Service</Link>
          </div>
          
          <p className="font-sans text-xs text-white/40">
            © 2026 Calcutta Sweets. All rights reserved
          </p>

          <p className="font-sans text-xs text-white/40">
            Designed with love in Raipur.
          </p>
        </div>

      </div>
    </footer>
  );
}
