import axiosClient from "../config/axiosClient";

export async function searchRoles(params) {
  const response = await axiosClient.get("/api/roles/search", {
    params,
  });

  return response.data;
}

export async function getRoleDetail(id) {
  const response = await axiosClient.get(`/api/roles/${id}`);

  return response.data;
}

export async function getRolePermissions(id) {
  const response = await axiosClient.get(`/api/roles-permissions/${id}`);

  return response.data;
}

export async function updateRolePermissions(id, permissions) {
  const response = await axiosClient.put(`/api/roles-permissions/${id}`, {
    permissions,
  });

  return response.data;
}