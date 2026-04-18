"use client";

import Link from "next/link";
import {
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
  Sparkles,
} from "lucide-react";
import { useAdminStats, type AdminStats } from "@/hooks/useAdminData";
import { AdminDashboardSkeleton } from "@/components/admin/AdminDashboardSkeleton";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

const quickLinks: {
  href: string;
  title: string;
  description: string;
  icon: typeof Images;
  statKey?: keyof AdminStats;
}[] = [
  {
    href: "/admin/hero",
    title: "Hero carousel",
    description: "Headlines, subtitles, and full-width images for the homepage slider.",
    icon: Images,
    statKey: "heroSlides",
  },
  {
    href: "/admin/occasions",
    title: "Celebrations",
    description: "Seasonal boxes and occasion imagery shown on the celebrations page.",
    icon: PartyPopper,
    statKey: "occasions",
  },
  {
    href: "/admin/celebration-hero",
    title: "Celebration hero",
    description: "Top banner copy and the three hero photos on the celebrations landing page.",
    icon: Sparkles,
    statKey: "celebrationHero",
  },
  {
    href: "/admin/signature-sweets",
    title: "Signature sweets",
    description: "Featured items and imagery for your bestsellers section.",
    icon: Candy,
    statKey: "signatureSweets",
  },
  {
    href: "/admin/menu-products",
    title: "Menu",
    description: "Storefront menu items, prices, categories, and product detail pages.",
    icon: UtensilsCrossed,
    statKey: "menuProducts",
  },
  {
    href: "/admin/story",
    title: "Story & journey",
    description: "Long-form story, portrait image, and timeline milestones.",
    icon: BookOpen,
    statKey: "timelineEvents",
  },
  {
    href: "/admin/wedding-stats",
    title: "Wedding stats",
    description: "Numbers and labels for the wedding experience section.",
    icon: Heart,
    statKey: "weddingStats",
  },
  {
    href: "/admin/special-orders",
    title: "Special orders",
    description: "Copy and banner for bulk or custom order requests.",
    icon: Package,
    statKey: "specialOrders",
  },
  {
    href: "/admin/contact",
    title: "Visit us",
    description: "Address, phone, email, hours, and notes for the flagship location.",
    icon: MapPin,
    statKey: "contacts",
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    description: "Customer quotes shown on the homepage when enabled.",
    icon: MessageSquareQuote,
    statKey: "testimonials",
  },
  {
    href: "/admin/visit-highlights",
    title: "Visit page strip",
    description: "Three highlights under the map (heritage, natural, taste).",
    icon: BarChart3,
    statKey: "visitUsStats",
  },
  {
    href: "/admin/celebration-process",
    title: "Celebration steps",
    description: "Four-step process cards on the celebrations page.",
    icon: ListOrdered,
    statKey: "celebrationSteps",
  },
];

const summaryCards: { label: string; statKey: keyof AdminStats; icon: typeof Images }[] = [
  { label: "Hero slides", statKey: "heroSlides", icon: Images },
  { label: "Celebrations", statKey: "occasions", icon: PartyPopper },
  { label: "Signature items", statKey: "signatureSweets", icon: Candy },
  { label: "Menu items", statKey: "menuProducts", icon: UtensilsCrossed },
  { label: "Timeline events", statKey: "timelineEvents", icon: BookOpen },
];

export default function AdminDashboard() {
  const { data: stats, loading, error } = useAdminStats();

  if (loading && stats === null) {
    return <AdminDashboardSkeleton />;
  }

  if (error && stats === null) {
    return (
      <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
        Could not load dashboard stats: {error}
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <AdminBreadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Dashboard" },
            ]}
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Admin dashboard</h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Manage live site content from one place. Counts update from your database; open a card to edit.
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-lg border border-neutral-200/70 bg-gradient-to-b from-neutral-50/90 to-neutral-50/40 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:max-w-[220px] lg:text-right">
          <div className="flex items-center justify-between gap-2 lg:justify-end">
            <p className="min-w-0 text-sm font-semibold leading-snug text-neutral-900">Admin panel</p>
            <span
              className="shrink-0 rounded-md bg-[#C8773A]/14 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8f4f20] ring-1 ring-[#C8773A]/20"
              title="Content management system"
            >
              CMS
            </span>
          </div>
          <p className="mt-2 border-t border-neutral-200/60 pt-2 text-[11px] leading-relaxed text-neutral-500 lg:text-right">
            Storefront content
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ label, statKey, icon: Icon }) => (
          <div
            key={statKey}
            className="flex items-center justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-neutral-900">
                {loading ? "—" : stats?.[statKey] ?? 0}
              </p>
            </div>
            <Icon className="h-11 w-11 text-[#C8773A]/25" strokeWidth={1.25} />
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Manage content</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map(({ href, title, description, icon: Icon, statKey }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm transition hover:border-[#C8773A]/40 hover:shadow-md"
            >
              <Icon className="mb-3 h-8 w-8 text-[#C8773A]" strokeWidth={1.5} />
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-neutral-900">{title}</h3>
                {statKey && stats && (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium tabular-nums text-neutral-600">
                    {stats[statKey]}
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">{description}</p>
              <span className="mt-4 text-xs font-semibold text-[#C8773A] opacity-0 transition group-hover:opacity-100">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
