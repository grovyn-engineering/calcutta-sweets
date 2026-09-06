import type { Metadata } from "next";
import Hero from "@/components/celebration/Hero";
import Occasions from "@/components/celebration/Occasions";
import Process from "@/components/celebration/Process";
import EnquiryForm from "@/components/celebration/EnquiryForm";

export const metadata: Metadata = {
  title: "Bulk Sweets & Custom Wedding Platters",
  description:
    "Order custom sweet boxes, wedding gift hampers, Diwali corporate sweet boxes, and bulk festival orders from Calcutta Sweets, Raipur.",
  alternates: {
    canonical: "/celebration",
  },
  openGraph: {
    title: "Bulk Sweets & Custom Wedding Platters | Calcutta Sweets",
    description:
      "Order custom sweet boxes, wedding gift hampers & bulk festival orders handcrafted in Raipur.",
    url: "/celebration",
  },
};

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#FAF5F0] overflow-x-hidden">
      <Hero />
      <Occasions />
      <Process />
      <EnquiryForm />
    </main>
  );
}
