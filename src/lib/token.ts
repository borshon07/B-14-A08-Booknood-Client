import { authClient } from "@/lib/auth-client";

let cachedToken = "";
let expiresAt = 0;

export async function getToken() {
  if (cachedToken && Date.now() < expiresAt) return cachedToken;

  const { data } = await authClient.token();
  cachedToken = data?.token || "";
  expiresAt = Date.now() + 10 * 60 * 1000 - 30 * 1000; 
  return cachedToken;
}

export function clearToken() {
  cachedToken = "";
  expiresAt = 0;
}

export async function authFetch(url: string, options: RequestInit = {}) {
  const token = await getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}