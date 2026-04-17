import { getAdminToken } from "@/lib/adminToken";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const finalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const bearer = getAdminToken();

  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(finalUrl, defaultOptions);
  return response;
};
