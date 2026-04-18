import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { fetchWithAuth } from "@/lib/apiHelper";

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
          if (isSingle) {
            setData(res.data ?? null);
          } else {
            setData(Array.isArray(res.data) ? res.data : []);
          }
        } else {
          setError(res.message);
          if (isSingle) (setData as (v: T | null) => void)(null);
          else setData([] as T);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch");
        if (isSingle) (setData as (v: T | null) => void)(null);
        else setData([] as T);
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
export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  hours: string | null;
  visitHeroImageUrl?: string | null;
  visitHeroPublicId?: string | null;
  visitHeroEyebrow?: string | null;
  visitHeroTitle?: string | null;
  visitHeroDescription?: string | null;
  visitDirectionsUrl?: string | null;
  visitFeaturesHeading?: string | null;
  visitFeaturesSubtitle?: string | null;
  visitWelcomeHeading?: string | null;
  visitWelcomeBody?: string | null;
  visitOwnerName?: string | null;
  visitOwnerRole?: string | null;
  visitOwnerImageUrl?: string | null;
  visitOwnerPublicId?: string | null;
  visitWelcomeLocationLine?: string | null;
  visitWelcomeHoursLine?: string | null;
  socialLinks?: { platform: string; url: string }[] | null;
}

export interface VisitUsFeature {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  publicId: string | null;
  sortOrder: number;
}
export interface StoryCraftStep {
  icon: string;
  title: string;
  description: string;
}
export interface StoryFamilyMember {
  name: string;
  title: string;
  description: string;
  image: string;
}
export interface Story {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publicId: string;
  heroEyebrow?: string | null;
  craftOverline?: string | null;
  craftHeadline?: string | null;
  craftImageUrl?: string | null;
  craftPublicId?: string | null;
  craftSteps?: StoryCraftStep[] | null;
  timelineTitle?: string | null;
  timelineSubtitle?: string | null;
  familySectionTitle?: string | null;
  familyMembers?: StoryFamilyMember[] | null;
  quoteText?: string | null;
  quoteAttribution?: string | null;
}
export interface SpecialOrder { id: string; title: string; description: string; imageUrl: string; publicId: string; }
export interface TimelineEvent { id: string; year: string; title: string; description: string; }
export interface HeroData { id: string; title: string; subtitle: string; imageUrl: string; publicId: string; }
export interface Testimonial { id: string; quote: string; name: string; title: string; sortOrder: number; }
export interface VisitUsStat { id: string; value: string; label: string; sortOrder: number; }
export interface CelebrationProcessStep { id: string; stepNumber: string; title: string; description: string; iconKey: string; sortOrder: number; }

export interface CelebrationHero {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  mainImageUrl: string | null;
  mainPublicId: string | null;
  secondaryLeftUrl: string | null;
  secondaryLeftPublicId: string | null;
  secondaryRightUrl: string | null;
  secondaryRightPublicId: string | null;
}

export interface AdminStats {
  heroSlides: number;
  occasions: number;
  signatureSweets: number;
  weddingStats: number;
  timelineEvents: number;
  stories: number;
  contacts: number;
  specialOrders: number;
  testimonials: number;
  visitUsStats: number;
  celebrationSteps: number;
  menuProducts: number;
  visitUsFeatures: number;
  celebrationHero: number;
}

export interface MenuProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  imageUrl: string | null;
  publicId: string | null;
  sortOrder: number;
  isActive: boolean;
  isSignature: boolean;
}

export const useSignatureSweets = createDataHook<SignatureSweet[]>("/signature-sweets", false);
export const useWeddingStats = createDataHook<WeddingStat[]>("/wedding-stats", false);
export const useContactInfo = createDataHook<ContactInfo | null>("/contact", true);
export const useStory = createDataHook<Story | null>("/story", true);
export const useSpecialOrders = createDataHook<SpecialOrder | null>("/special-orders", true);
export const useTimelineEvents = createDataHook<TimelineEvent[]>("/timeline-events", false);
export const useHeroSlides = createDataHook<HeroData[]>("/hero", false);
export const useTestimonials = createDataHook<Testimonial[]>("/testimonials", false);
export const useVisitUsStats = createDataHook<VisitUsStat[]>("/visit-us-stats", false);
export const useVisitUsFeatures = createDataHook<VisitUsFeature[]>("/visit-us-features", false);
export const useCelebrationProcessSteps = createDataHook<CelebrationProcessStep[]>("/celebration-process", false);
export const useCelebrationHero = createDataHook<CelebrationHero | null>("/celebration-hero", true);

export function useMenuProductsManage() {
  const [data, setData] = useState<MenuProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/menu-products/manage");
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to fetch");
        setData([]);
        return;
      }
      if (json.success) setData(json.data || []);
      else setError(json.message || "Failed to fetch");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createItem = async (payload: Record<string, unknown>) => {
    const res = await fetchWithAuth("/menu-products", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.success) await fetchData();
    return json;
  };

  const updateItem = async (id: string, payload: Record<string, unknown>) => {
    const res = await fetchWithAuth(`/menu-products/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.success) await fetchData();
    return json;
  };

  const deleteItem = async (id: string) => {
    const res = await fetchWithAuth(`/menu-products/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) await fetchData();
    return json;
  };

  return { data, loading, error, createItem, updateItem, deleteItem, refetch: fetchData };
}

export function useAdminStats() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchWithAuth("/admin/stats");
        const json = await res.json();
        if (cancelled) return;
        if (json.success) setData(json.data);
        else setError(json.message || "Failed to load stats");
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load stats");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
