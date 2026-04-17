import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export interface Occasion {
  id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  iconKey?: string;
  sortOrder?: number;
}

export function useOccasions() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOccasions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/occasions");
      if (res.success) {
        setOccasions(Array.isArray(res.data) ? res.data : []);
      } else {
        setError(res.message || "Failed to fetch occasions");
        setOccasions([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch occasions");
      setOccasions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOccasions();
  }, [fetchOccasions]);

  const createOccasion = async (data: Partial<Occasion>) => {
    const res = await apiFetch("/occasions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.success) await fetchOccasions();
    return res;
  };

  const updateOccasion = async (id: string, data: Partial<Occasion>) => {
    const res = await apiFetch(`/occasions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res.success) await fetchOccasions();
    return res;
  };

  const deleteOccasion = async (id: string) => {
    const res = await apiFetch(`/occasions/${id}`, {
      method: "DELETE",
    });
    if (res.success) await fetchOccasions();
    return res;
  };

  return {
    occasions,
    loading,
    error,
    createOccasion,
    updateOccasion,
    deleteOccasion,
    refetch: fetchOccasions
  };
}
