"use client";

import { AdminBreadcrumbs } from "./AdminBreadcrumbs";

function ShimmerBlock({ className }: { className?: string }) {
  return <div className={`admin-shimmer-surface ${className ?? ""}`} />;
}

export function AdminDashboardSkeleton() {
  return (
    <div className="w-full min-w-0 space-y-10" aria-busy="true" aria-label="Loading dashboard">
      <AdminBreadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Dashboard" },
        ]}
      />
      <header className="space-y-3">
        <ShimmerBlock className="h-9 w-56 max-w-[min(100%,18rem)] rounded-lg" />
        <ShimmerBlock className="h-4 max-w-2xl rounded-md" />
        <ShimmerBlock className="h-4 max-w-xl rounded-md opacity-80" />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm"
          >
            <div className="min-w-0 space-y-3">
              <ShimmerBlock className="h-3 w-24 rounded" />
              <ShimmerBlock className="h-9 w-14 rounded-md" />
            </div>
            <ShimmerBlock className="h-11 w-11 shrink-0 rounded-xl" />
          </div>
        ))}
      </div>

      <section>
        <ShimmerBlock className="mb-4 h-4 w-36 rounded" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm"
            >
              <ShimmerBlock className="mb-3 h-8 w-8 rounded-lg" />
              <div className="flex items-start justify-between gap-3">
                <ShimmerBlock className="h-5 min-w-0 flex-1 rounded-md" />
                <ShimmerBlock className="h-6 w-10 shrink-0 rounded-full" />
              </div>
              <div className="mt-3 space-y-2">
                <ShimmerBlock className="h-3 w-full rounded" />
                <ShimmerBlock className="h-3 w-[88%] rounded" />
              </div>
              <ShimmerBlock className="mt-5 h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
