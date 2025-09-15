import { API_URL } from "./api";
import Cookies from 'js-cookie';

// Helper function สร้าง header พร้อม token
const getAuthHeaders = () => {
  const token = Cookies.get('token');
  if (!token) throw new Error("Authentication token not found");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getPendingApplications = async () => {
  const res = await fetch(`${API_URL}/admin/vendor-applications`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch pending applications');
  return res.json();
};

export const approveApplication = async (applicationId) => {
  const res = await fetch(`${API_URL}/admin/vendor-applications/${applicationId}/approve`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to approve application');
  return res.json();
};

export const rejectApplication = async (applicationId) => {
  const res = await fetch(`${API_URL}/admin/vendor-applications/${applicationId}/reject`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to reject application');
  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const updateUserRole = async (userId, roles) => {
  const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ roles }) // `roles` should be an array e.g., ['customer', 'vendor']
  });
  if (!res.ok) throw new Error('Failed to update user role');
  return res.json();
};

export const banUser = async (userId) => {
  const res = await fetch(`${API_URL}/admin/users/${userId}/ban`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to ban user');
  return res.json();
};