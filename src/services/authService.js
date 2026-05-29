import axiosClient from "../config/axiosClient";

export async function notifyLoginSuccess() {
  const response = await axiosClient.post("/api/v1/auth/login");
  return response.data;
}