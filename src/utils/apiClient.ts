import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DUNKIN } from "../pages/LoginPage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

function isTokenExpired(token: string) {
  if (!token) return true;

  const { exp } = jwtDecode(token);

  if (!exp) throw new Error("Token does not have a valid exp");
  if (Date.now() >= exp * 1000) {
    return true;
  }

  return false;
}

apiClient.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem(DUNKIN);

    if (accessToken && isTokenExpired(accessToken)) {
      try {
        const refreshToken = Cookies.get(DUNKIN);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        accessToken = response.data.accessToken;

        if (!accessToken) throw new Error("No token was generated");

        localStorage.setItem(DUNKIN, accessToken);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(DUNKIN);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const { accessToken } = response.data;
        localStorage.setItem(DUNKIN, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
