import type { Metadata } from "next";
import StoryPage from "@/components/story/StoryPage";

export const metadata: Metadata = {
  title: "Our Heritage & Story",
  description:
    "Discover the story of Calcutta Sweets: 3 generations of traditional Bengali recipes, artisanal craft, and legendary mithai in Tatibandh, Raipur since 2000.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Our Heritage & Story | Calcutta Sweets",
    description:
      "3 generations of traditional Bengali recipes & artisanal craft in Raipur since 2000.",
    url: "/story",
  },
};

export default function Page() {
  return <StoryPage />;
}
