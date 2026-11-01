import { authClient } from "@/lib/auth-client";

let cachedToken = "";
let expiresAt = 0;

// get the jwt token, reuse it until it is close to expiring
export async function getToken() {
  if (cachedToken && Date.now() < expiresAt) return cachedToken;

  const { data } = await authClient.token();
  cachedToken = data?.token || "";
  expiresAt = Date.now() + 10 * 60 * 1000 - 30 * 1000; // about 10 minutes
  return cachedToken;
}

// call this on logout so the old token is not reused
export function clearToken() {
  cachedToken = "";
  expiresAt = 0;
}

// fetch with the token in the header
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