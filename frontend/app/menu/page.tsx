import type { Metadata } from "next";
import { Suspense } from "react";
import MenuPage from "@/components/menu/Products";

export const metadata: Metadata = {
  title: "Artisanal Sweets & Mithai Menu",
  description:
    "Explore our full handcrafted collection of authentic Bengali Mithai, Sondesh, Roshogolla, Gulab Jamun, Kaju Katli & dry fruit sweets in Raipur.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Artisanal Sweets & Mithai Menu | Calcutta Sweets",
    description:
      "Explore handcrafted authentic Bengali Mithai, Sondesh, Roshogolla & traditional Indian sweets in Raipur.",
    url: "/menu",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading menu...</div>}>
      <MenuPage />
    </Suspense>
  );
}
