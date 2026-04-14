/**
 * Server-side fetch utility for Next.js App Router Server Components.
 *
 * Guarantees:
 * - ALWAYS returns the provided fallback on ANY failure (never null/undefined)
 * - Handles: network errors, non-200 responses, missing json.data,
 *   empty arrays, null responses, malformed JSON, and timeouts
 * - Uses AbortController with a 5-second timeout
 * - Dev-only console warnings (suppressed in production)
 */

type FetchOptions<T> = {
  fallback: T;
  revalidate?: number;
};

const isDev = process.env.NODE_ENV === "development";

export async function fetchFromBackend<T>(
  endpoint: string,
  options: FetchOptions<T>
): Promise<T> {
  const { fallback, revalidate = 0 } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
      cache: revalidate === 0 ? "no-store" : undefined,
      next: revalidate > 0 ? { revalidate } : undefined,
    });

    if (!res.ok) {
      throw new Error(`API ${endpoint} returned ${res.status}`);
    }

    const json = await res.json();

    // Guard: no body at all
    if (!json) {
      return fallback;
    }

    // Guard: API wraps in { data: ... } but data is missing/null
    if (json.data === undefined || json.data === null) {
      return fallback;
    }

    // Guard: data is an empty array
    if (Array.isArray(json.data) && json.data.length === 0) {
      return fallback;
    }

    return json.data as T;
  } catch (error) {
    if (isDev) {
      console.warn(`[Fallback Triggered] ${endpoint}:`, error);
    }
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}
