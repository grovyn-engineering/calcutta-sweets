"use client";

import { useCallback, useEffect, useState } from "react";
import OurStoryClient from "./OurStoryClient";
import { OurStoryFullSkeleton } from "@/components/ui/StorefrontSkeletons";

const FALLBACK_STORY = {
  title: "A small counter in Tatibandh,a Grandmother's recipe diary.",
  content:
    "Our recipes have been in the family for three generations. We started as a small shop here in Raipur and today we are still using those same traditional methods to bring you the real taste of Bengal.",
  imageUrl: "/images/shopInterior.png",
};

const FALLBACK_STATS = [
  { value: "EST 2000", label: "PIONEERING TRADITION" },
  { value: "40+ VARIETIES", label: "ARTISANAL RECIPES" },
  { value: "3 GENERATIONS", label: "FAMILY LEGACY" },
  { value: "CALCUTTA'S FINEST", label: "LOCAL FAVORITE" },
];

type StoryStatRow = { id: string; value: string; label: string };

async function fetchStoryAndStats(): Promise<{ story: typeof FALLBACK_STORY; stats: StoryStatRow[] }> {
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not configured");

  const get = async (path: string) => {
    const res = await fetch(`${base}${path}`, { cache: "no-store" });
    const json = (await res.json()) as { success?: boolean; data?: unknown; message?: string };
    if (!res.ok || !json || json.success !== true) {
      throw new Error(typeof json.message === "string" ? json.message : `Failed ${res.status}`);
    }
    return json.data;
  };

  const [storyData, statsData] = await Promise.all([get("/story"), get("/wedding-stats")]);

  const rawStory = Array.isArray(storyData) ? storyData[0] : storyData;
  const story = {
    title: (rawStory as { title?: string })?.title ?? FALLBACK_STORY.title,
    content: (rawStory as { content?: string })?.content ?? FALLBACK_STORY.content,
    imageUrl: (rawStory as { imageUrl?: string })?.imageUrl ?? FALLBACK_STORY.imageUrl,
  };

  const rawStats = Array.isArray(statsData) ? statsData : [];
  type StatRow = { id?: string; value: string; label: string };
  const stats =
    rawStats.length > 0
      ? (rawStats as StatRow[]).map((s, i) => ({
          id: s.id ?? `st-${i}`,
          value: s.value,
          label: s.label,
        }))
      : FALLBACK_STATS.map((s, i) => ({ ...s, id: `fb-${i}` }));

  return { story, stats };
}

export default function OurStory() {
  const [story, setStory] = useState(FALLBACK_STORY);
  const [stats, setStats] = useState<
    { value: string; label: string; id: string }[]
  >(FALLBACK_STATS.map((s, i) => ({ ...s, id: `fb-${i}` })));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetchStoryAndStats();
      setStory(r.story);
      setStats(r.stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load story");
      setStory(FALLBACK_STORY);
      setStats(FALLBACK_STATS.map((s, i) => ({ ...s, id: `fb-${i}` })));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <OurStoryFullSkeleton />;
  }

  return (
    <>
      {error ? (
        <div className="w-full bg-amber-50 border-b border-amber-200/80 px-4 py-3 text-center text-sm text-amber-950">
          Story section is showing cached defaults: {error}
        </div>
      ) : null}
      <OurStoryClient story={story} stats={stats} />
    </>
  );
}
