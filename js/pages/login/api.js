// api.js

import { getRefreshToken, saveAccessToken } from "./auth.js";

/** Access Token 재발급 요청 */
async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  const res = await fetch(
    "https://api.wenivops.co.kr/services/open-market/accounts/token/refresh/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    }
  );

  if (!res.ok) return false;

  const data = await res.json();
  if (data.access) {
    saveAccessToken(data.access);
    return true;
  }
  return false;
}
