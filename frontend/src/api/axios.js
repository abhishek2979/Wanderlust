import axios from "axios";

// Base URL - in dev, Vite proxy sends /api → http://localhost:8080/api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});
// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If 401 comes back, user session has expired → clear storage
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
