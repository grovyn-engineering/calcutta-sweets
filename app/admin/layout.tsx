"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchWithAuth } from "@/lib/apiHelper";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

const navLinks = [
  { href: "/admin/hero", label: "Hero Section" },
  { href: "/admin/occasions", label: "Celebrations" },
  { href: "/admin/signature-sweets", label: "Signature Sweets" },
  { href: "/admin/story", label: "Story & Journey" },
  { href: "/admin/wedding-stats", label: "Wedding & Special Orders" },
  { href: "/admin/special-orders", label: "Special Orders" },
  { href: "/admin/contact", label: "Visit Us" },
];

function SidebarContent({
  pathname,
  onLogout,
  onNavClick,
}: {
  pathname: string;
  onLogout: () => void;
  onNavClick?: () => void;
}) {
  return (
    <>
      <div className="px-5 pt-6 pb-5 border-b border-[#3E2F26]/8">
        <Image src="/logo.svg" alt="Calcutta Sweets" width={180} height={78} className="h-12 w-auto" />
      </div>
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavClick}
              className={`flex items-center gap-2 px-3 py-2.5 rounded text-[10.5px] font-semibold tracking-widest transition-all duration-150 ${isActive
                ? "bg-[#C8773A]/10 text-[#C8773A]"
                : "text-[#3E2F26]/50 hover:text-[#3E2F26] hover:bg-[#3E2F26]/5"
                }`}
            >
              <span
                className={`w-[5px] h-[5px] rounded-full shrink-0 transition-colors ${isActive ? "bg-[#C8773A]" : "bg-[#3E2F26]/15"
                  }`}
              />
              {link.label.toUpperCase()}
            </a>
          );
        })}
      </nav>

      <div className="px-5 py-5 border-t border-[#3E2F26]/8 shrink-0">
        <button
          onClick={onLogout}
          className="text-[10px] text-[#3E2F26]/35 hover:text-[#C8773A] transition-colors tracking-widest uppercase font-semibold"
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const verifyAuth = async () => {
      try {
        const res = await fetchWithAuth("/auth/me", { method: "GET" });
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await fetchWithAuth("/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E8]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C8773A] border-t-transparent" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#FAF3E8] flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#3E2F26", color: "#FAF3E8", borderRadius: "6px", fontSize: "13px" },
          success: { iconTheme: { primary: "#C8773A", secondary: "#FAF3E8" } },
        }}
      />

      <aside
        className="w-56 bg-white border-r border-[#3E2F26]/8 flex-col hidden md:flex shrink-0 min-h-screen"
        style={{ boxShadow: "1px 0 0 rgba(62,47,38,0.06)" }}
      >
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#3E2F26]/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white flex flex-col md:hidden transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ boxShadow: "4px 0 24px rgba(62,47,38,0.1)" }}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-[#FAF3E8] text-[#3E2F26]/50 hover:text-[#3E2F26] transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <SidebarContent
          pathname={pathname}
          onLogout={handleLogout}
          onNavClick={() => setMobileMenuOpen(false)}
        />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#3E2F26]/8 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-[#3E2F26]/50 hover:text-[#3E2F26] hover:bg-[#FAF3E8] transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Image src="/logo.svg" alt="Calcutta Sweets" width={140} height={60} className="h-9 w-auto" />
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
