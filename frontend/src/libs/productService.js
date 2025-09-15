import { API_URL } from "./api";
import Cookies from 'js-cookie';

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  if (!token) throw new Error("Authentication token not found");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`, { headers: getAuthHeaders() });
  return res.json();
};

export const getProductsById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, { headers: getAuthHeaders() });
  return res.json();
};

export const createProduct = async (newProduct) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(newProduct),
  });
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.status;
};