"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { fetchWithAuth } from "@/lib/apiHelper";
import { clearAdminToken } from "@/lib/adminToken";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  Images,
  PartyPopper,
  Candy,
  BookOpen,
  Heart,
  Package,
  MapPin,
  MessageSquareQuote,
  BarChart3,
  ListOrdered,
  UtensilsCrossed,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { FourDotsLoader } from "@/components/admin/FourDotsLoader";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero", icon: Images },
  { href: "/admin/occasions", label: "Celebrations", icon: PartyPopper },
  { href: "/admin/signature-sweets", label: "Signature Sweets", icon: Candy },
  { href: "/admin/menu-products", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/story", label: "Story", icon: BookOpen },
  { href: "/admin/wedding-stats", label: "Wedding stats", icon: Heart },
  { href: "/admin/special-orders", label: "Special orders", icon: Package },
  { href: "/admin/contact", label: "Visit us", icon: MapPin },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/visit-highlights", label: "Visit strip", icon: BarChart3 },
  { href: "/admin/celebration-process", label: "Celebration steps", icon: ListOrdered },
];

function navActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const verifyAuth = async () => {
      try {
        const res = await fetchWithAuth("/auth/me", { method: "GET" });
        const data = await res.json();
        if (data.success) setIsAuthenticated(true);
        else {
          if (res.status === 401) clearAdminToken();
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
    clearAdminToken();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex h-dvh max-h-dvh flex-col items-center justify-center gap-3 bg-white">
        <FourDotsLoader size="lg" aria-label="Verifying session" />
        <p className="text-sm text-neutral-500">Loading admin…</p>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!isAuthenticated) return null;

  const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-0.5 p-2" aria-label="Admin sections">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const active = navActive(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              active
                ? "bg-[#C8773A]/12 font-semibold text-[#8f4f20] ring-1 ring-[#C8773A]/20"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${active ? "text-[#C8773A]" : "text-neutral-400"}`}
              strokeWidth={active ? 2.25 : 1.75}
            />
            <span className="leading-snug">{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div
      className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-white text-neutral-900"
      style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-sm",
          style: {
            background: "#fff",
            color: "#292524",
            border: "1px solid #e7e5e4",
            borderRadius: "10px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          },
          success: { iconTheme: { primary: "#C8773A", secondary: "#fff" } },
        }}
      />

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden md:flex-row">
        <aside className="hidden min-h-0 w-60 shrink-0 flex-col overflow-hidden border-r border-neutral-200 bg-neutral-50/50 md:flex">
          <div className="border-b border-neutral-200/80 bg-white px-3 py-2.5">
            <Link href="/admin" className="block w-full min-w-0" title="Dashboard">
              <Image
                src="/logo.svg"
                alt="Calcutta Sweets"
                width={320}
                height={100}
                className="h-[4.25rem] w-auto max-w-full object-contain object-left sm:h-20"
                priority
              />
            </Link>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <SidebarNav />
            <div className="mt-4 border-t border-neutral-200/80 px-2 pb-4 pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-700 transition hover:border-[#C8773A]/35 hover:text-[#C8773A]"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="z-30 flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/admin" className="min-w-0 flex-1 pr-2">
                <Image
                  src="/logo.svg"
                  alt="Calcutta Sweets"
                  width={280}
                  height={87}
                  className="h-12 w-auto max-w-full object-contain object-left sm:h-[3.25rem]"
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-[#C8773A]/30 hover:text-[#C8773A]"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
            </button>
          </header>

          <main className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain py-8 px-4 sm:px-5 md:px-6 lg:px-8 md:py-10 [-webkit-overflow-scrolling:touch]">
            {children}
          </main>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <div>
                <span className="text-sm font-semibold text-neutral-900">Admin panel</span>
                <p className="text-[11px] text-neutral-500">Choose a section</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <div className="mt-4 border-t border-neutral-100 px-2 pb-6 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
