import { API_URL } from "./api";
import Cookies from 'js-cookie';

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
    const token = Cookies.get('token');
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    
    return await res.json();
  } catch (err) {
    console.error("GetMe failed:", err);
    throw err;
  }
};