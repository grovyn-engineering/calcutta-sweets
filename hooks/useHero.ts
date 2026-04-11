import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
  publicId: string;
}

export function useHero() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHero = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/hero");
      if (res.success && res.data) {
        setHero(res.data);
      } else {
        // handled by fallback in UI
        setHero(null);
      }
    } catch (err: any) {
      console.error("Hero fetch error:", err);
      setError(err.message || "Failed to fetch hero section");
      setHero(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  const updateHero = async (data: Partial<HeroData>) => {
    const res = await apiFetch("/hero", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res.success) await fetchHero();
    return res;
  };

  return {
    hero,
    loading,
    error,
    updateHero,
    refetch: fetchHero
  };
}
