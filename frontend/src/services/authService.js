import { API_URL } from "./api";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  // const token = localStorage.getItem("authToken");
  if (!token) {
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const Login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Login failed:", err);
    throw new Error("Login failed");
  }
};

export const register = async (newUser) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  } catch (e) {
    console.error("Registration failed:", e);
    throw new Error("Can not create user");
  }
};

export const getMe = async () => {
  try {
    // const token = Cookies.get('token');
    // const token = localStorage.getItem('authToken');
    // if (!token) throw new Error("No token found");

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch profile");

    return await res.json();
  } catch (err) {
    console.error("GetMe failed:", err);
    throw err;
  }
};

export const updateMe = async (updatedData) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const createVendorApplication = async (applicationData) => {
  const res = await fetch(`${API_URL}/vendor-applications`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(applicationData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to submit application");
  }
  return res.json();
};

export const getMyApplicationStatus = async () => {
  const res = await fetch(`${API_URL}/vendor-applications/status`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  // If user has no application, backend should return 404
  if (res.status === 404) {
    return { success: true, data: null }; // No application found
  }
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to get application status");
  }
  return res.json();
};
