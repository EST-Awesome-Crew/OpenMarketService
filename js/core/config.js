export const DEFAULT_CONFIG = {
  baseURL: "https://api.wenivops.co.kr/services/open-market",
  autoRefresh: true,
  debug: false,
};

export let globalConfig = { ...DEFAULT_CONFIG };
export let accessToken = localStorage.getItem("accessToken");
export let refreshToken = localStorage.getItem("refreshToken");
export let user = localStorage.getItem("user");

// 설정 관리
export function updateConfig(newConfig) {
  globalConfig = { ...globalConfig, ...newConfig };
  if (globalConfig.debug) {
    console.log("[API] Config updated:", globalConfig);
  }
}

// 현재 설정을 복사해서 반환
export function getConfig() {
  return { ...globalConfig };
}

// 토큰 상태 확인
export function getTokenStatus() {
  return {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    autoRefresh: globalConfig.autoRefresh,
  };
}

// 토큰 및 사용자 정보 저장
export function setTokens(access, refresh, userData) {
  accessToken = access;
  refreshToken = refresh;
  if (access) localStorage.setItem("accessToken", access);
  if (refresh) localStorage.setItem("refreshToken", refresh);
  if (userData) localStorage.setItem("user", JSON.stringify(userData));
}

// 토큰 및 사용자 정보 삭제
export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  user = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("orderList");
  sessionStorage.removeItem("orderType");
}

// HTTP 요청 헤더 생성
function getHeaders(isFormData = false) {
  const headers = {};

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// API 요청 기본 함수
export async function request(endpoint, options = {}) {
  const url = `${globalConfig.baseURL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getHeaders(options.isFormData),
      ...options.headers,
    },
  };

  if (globalConfig.debug) {
    console.log(`[API] Request: ${url}`, config);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    if (globalConfig.debug) {
      console.log(`[API] Success:`, data);
    }

    return { success: true, data, status: response.status };
  } catch (error) {
    if (globalConfig.debug) {
      console.log(`[API] Error:`, error.message);
    }

    return {
      success: false,
      error: error.message,
      status: error.status || 500,
    };
  }
}
