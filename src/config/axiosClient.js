import axios from "axios";
import keycloak from "./keycloak";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  await keycloak.updateToken(30);

  config.headers.Authorization = `Bearer ${keycloak.token}`;
  config.headers["x-kxh-realm"] = "demo";

  return config;
});

export default axiosClient;