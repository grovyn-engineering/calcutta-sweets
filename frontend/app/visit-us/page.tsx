import type { Metadata } from "next";
import Hero from "@/components/visit-us/Hero";

export const metadata: Metadata = {
  title: "Visit Our Sweet Shop in Tatibandh, Raipur",
  description:
    "Visit Calcutta Sweets at Main Road, Tatibandh, Raipur, Chhattisgarh 492001. Open 9 AM — 10 PM daily. Call +91 99930 60082 for fresh orders & directions.",
  alternates: {
    canonical: "/visit-us",
  },
  openGraph: {
    title: "Visit Our Sweet Shop in Tatibandh, Raipur | Calcutta Sweets",
    description:
      "Visit Calcutta Sweets at Main Road, Tatibandh, Raipur. Open 9 AM — 10 PM daily for fresh Bengali Mithai.",
    url: "/visit-us",
  },
};

export default function Page() {
  return <Hero />;
}
