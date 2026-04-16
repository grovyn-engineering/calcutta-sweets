import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api";

function createDataHook<T>(endpoint: string, isSingle: boolean) {
  return function useData() {
    const [data, setData] = useState<T>(isSingle ? null : ([] as any));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(endpoint);
        if (res.success) {
          setData(res.data || (isSingle ? null : []));
        } else {
          setError(res.message);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const createItem = async (payload: Partial<any>) => {
      const res = await apiFetch(endpoint, { method: "POST", body: JSON.stringify(payload) });
      if (res.success) await fetchData();
      return res;
    };

    const updateItem = async (id: string | number | null, payload: Partial<any>) => {
      const url = id && !isSingle ? `${endpoint}/${id}` : endpoint;
      const res = await apiFetch(url, { method: "PUT", body: JSON.stringify(payload) });
      if (res.success) await fetchData();
      return res;
    };

    const deleteItem = async (id: string | number) => {
      const res = await apiFetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (res.success) await fetchData();
      return res;
    };

    return { data, loading, error, createItem, updateItem, deleteItem, refetch: fetchData };
  };
}

export interface SignatureSweet { id: string; title: string; subTitle: string; imageUrl: string; publicId: string; }
export interface WeddingStat { id: string; label: string; value: string; }
export interface ContactInfo { id: string; address: string; phone: string; email: string; description: string; }
export interface Story { id: string; title: string; content: string; imageUrl: string; publicId: string; }
export interface SpecialOrder { id: string; title: string; description: string; imageUrl: string; publicId: string; }
export interface TimelineEvent { id: string; year: string; title: string; description: string; }
export interface HeroData { id: string; title: string; subtitle: string; imageUrl: string; publicId: string; }

export const useSignatureSweets = createDataHook<SignatureSweet[]>("/signature-sweets", false);
export const useWeddingStats = createDataHook<WeddingStat[]>("/wedding-stats", false);
export const useContactInfo = createDataHook<ContactInfo | null>("/contact", true);
export const useStory = createDataHook<Story | null>("/story", true);
export const useSpecialOrders = createDataHook<SpecialOrder | null>("/special-orders", true);
export const useTimelineEvents = createDataHook<TimelineEvent[]>("/timeline-events", false);
export const useHeroSlides = createDataHook<HeroData[]>("/hero", false);
