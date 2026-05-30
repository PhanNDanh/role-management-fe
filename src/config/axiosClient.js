import axios from "axios";
import keycloak from "../config/keycloak";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
});

axiosClient.interceptors.request.use(async (config) => {
  if (keycloak?.authenticated) {
    await keycloak.updateToken(30);
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  config.headers["x-kxh-realm"] = "demo";

  return config;
});

export default axiosClient;