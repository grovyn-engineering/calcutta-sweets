import { fetchFromBackend } from "@/lib/serverFetch";
import OurStoryClient from "./OurStoryClient";

const FALLBACK_STORY = {
  title: "A small counter in Tatibandh,a Grandmother's recipe diary.",
  content: "Our recipes have been in the family for three generations. We started as a small shop here in Raipur and today we are still using those same traditional methods to bring you the real taste of Bengal.",
  imageUrl: "/images/shopInterior.png",
};

const FALLBACK_STATS = [
  { value: "EST 2000", label: "PIONEERING TRADITION" },
  { value: "40+ VARIETIES", label: "ARTISANAL RECIPES" },
  { value: "3 GENERATIONS", label: "FAMILY LEGACY" },
  { value: "CALCUTTA'S FINEST", label: "LOCAL FAVORITE" },
];

export default async function OurStory() {
  // Fetch multiple endpoints independently 
  // Notice that if one fails, the other can still succeed
  const storyData = await fetchFromBackend("/story", {
    fallback: FALLBACK_STORY,
  });

  const statsData = await fetchFromBackend("/wedding-stats", {
    fallback: FALLBACK_STATS,
  });

  // Handle possible endpoint arrays vs objects
  const rawStory = Array.isArray(storyData) ? storyData[0] : storyData;
  
  const story = {
    title: rawStory?.title ?? FALLBACK_STORY.title,
    content: rawStory?.content ?? FALLBACK_STORY.content,
    imageUrl: rawStory?.imageUrl ?? FALLBACK_STORY.imageUrl,
  };

  // Stats should be an array
  const rawStats = Array.isArray(statsData) ? statsData : FALLBACK_STATS;
  const stats = rawStats.length > 0 ? rawStats : FALLBACK_STATS;

  return <OurStoryClient story={story} stats={stats} />;
}