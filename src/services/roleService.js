import axios from "axios";

const ROLE_API_URL = "https://role-management-be.onrender.com/api/roles";

const ROLE_PERMISSIONS_API_URL = "https://role-management-be.onrender.com/api/roles-permissions";

const headers = {
  "x-kxh-realm": "demo"
};

export async function searchRoles(params) {

  const response = await axios.get(
    `${ROLE_API_URL}/search`,
    {
      headers,
      params
    }
  );

  return response.data;
}

export async function getRoleDetail(id) {
  const response = await axios.get(`${ROLE_API_URL}/${id}`, {
    headers
  });
  return response.data;
}

export async function getRolePermissions(id) {
  const response = await axios.get(`${ROLE_PERMISSIONS_API_URL}/${id}`, {
    headers
  });
  return response.data;
}

export async function updateRolePermissions(id, permissions) {
  const response = await axios.put(
    `${ROLE_PERMISSIONS_API_URL}/${id}`,
    { permissions },
    { headers }
  );
  return response.data;
}