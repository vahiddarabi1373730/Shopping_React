import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopping_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
