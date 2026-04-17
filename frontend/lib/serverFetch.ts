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

    if (!json || typeof json !== "object") {
      return fallback;
    }

    if (!("success" in json) || json.success !== true) {
      throw new Error(
        typeof (json as { message?: string }).message === "string"
          ? (json as { message: string }).message
          : "API returned success: false"
      );
    }

    if (json.data === undefined || json.data === null) {
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
