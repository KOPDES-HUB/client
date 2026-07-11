import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// #region agent log
api.interceptors.request.use((config) => {
  fetch("http://127.0.0.1:7591/ingest/e37e4eb2-1953-4214-a75b-ed7e54685425", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "6f6c76" },
    body: JSON.stringify({
      sessionId: "6f6c76",
      hypothesisId: "B,E",
      location: "lib/axios.ts:request",
      message: "axios request outgoing",
      data: {
        baseURL: config.baseURL ?? null,
        url: config.url ?? null,
        fullUrl: `${config.baseURL ?? ""}${config.url ?? ""}`,
        envApiUrl: process.env.NEXT_PUBLIC_API_URL ?? null,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    fetch("http://127.0.0.1:7591/ingest/e37e4eb2-1953-4214-a75b-ed7e54685425", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "6f6c76" },
      body: JSON.stringify({
        sessionId: "6f6c76",
        hypothesisId: "A,C,D",
        location: "lib/axios.ts:responseError",
        message: "axios response error",
        data: {
          code: error?.code ?? null,
          message: error?.message ?? null,
          status: error?.response?.status ?? null,
          responseMessage: error?.response?.data?.message ?? null,
          baseURL: error?.config?.baseURL ?? null,
          url: error?.config?.url ?? null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    return Promise.reject(error);
  },
);
// #endregion
