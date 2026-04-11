const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const finalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(finalUrl, defaultOptions);
  return response;
};
