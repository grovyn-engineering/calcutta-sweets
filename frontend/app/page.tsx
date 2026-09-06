import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import OurStory from "@/components/home/OurStory";
import Signatures from "@/components/home/Signatures";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Authentic Bengali Mithai & Artisanal Sweets in Raipur",
  description:
    "Discover legendary Bengali Mithai, Sondesh, Roshogolla, Kaju Katli & artisanal traditional Indian sweets at Calcutta Sweets, Tatibandh, Raipur.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Signatures />
      <OurStory />
      <Testimonials />
    </main>
  );
}
