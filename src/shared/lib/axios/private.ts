import { apiVOneBaseURL } from "@/shared/constants/general";
import { unprotectedPaths } from "@/shared/constants/paths";
import { useTokenStore } from "@/shared/stores/token-store";
import axios, { HttpStatusCode } from "axios";
import { axiosPublic } from "./public";
import { showNotification } from "@mantine/notifications";

export const axiosPrivate = axios.create({
  baseURL: apiVOneBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Private Axios - Request Interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    const { accessToken } = useTokenStore.getState();

    if (!accessToken) {
      redirectToLogin();
      return Promise.reject(new Error("Access token missing"));
    }

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Private Axios - Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle access denied
    if (error.response.data.data.code == "ACCESS_DENIED") {
      showNotification({
        message: error.response.data.message[0],
        position: "top-center",
      });
    }

    // Handle token expiration
    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop
      try {
        // Refresh token logic
        const response = await axiosPublic.post(
          `/authentication/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newAccessToken: string = response.data.accessToken;
        useTokenStore.getState().setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const redirectToLogin = () => {
  useTokenStore.getState().clearAccessToken();
  const attemptedPath = window.location.pathname + window.location.search;
  window.location.href = `${unprotectedPaths.login}?redirect=${encodeURIComponent(
    attemptedPath,
  )}`;
};
