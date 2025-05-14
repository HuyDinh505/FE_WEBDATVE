import axios from "axios";

// const baseURL = import.meta.env.VITE_API_URL;
// const baseURL = "http://127.0.0.1:8000/api";
const baseURL = "https://be-web-datve-1.onrender.com/api";
const timeout = 20000;

const axiosInstance = axios.create({
  baseURL,
  timeout,
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";

    // Không thêm token cho các request public
    if (!config.url.startsWith("/public/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Handle response
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        window.location.href = "/unauthorized";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
