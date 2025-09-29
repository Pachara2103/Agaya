import { API_URL } from "./api";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("Authentication token not found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getProducts = async (value) => {
  let res;
  if (value) {
    res = await fetch(`${API_URL}/products/?keyword=${value}`, {
      headers: getAuthHeaders(),
    });
  } else {
    res = await fetch(`${API_URL}/products/`, {
      headers: getAuthHeaders(),
    });
  }
  return res.json();
};

export const getProductsById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    headers: getAuthHeaders(),
  });
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

export const getProductsByVendorId = async () => {
  try {
    const data = await fetch(`${API_URL}/products/vendor/my-products`, {
      method: "GET",
      headers: getAuthHeaders(),
      headers: getAuthHeaders(),
    });
    const res = await data.json();
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Can not get product");
  }
};

export const uploadProductImage = async (formData) => {
  const token = Cookies.get("token");
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};
