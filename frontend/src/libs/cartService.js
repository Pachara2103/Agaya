import { API_URL } from "./api"; 
import Cookies from "js-cookie"; 

const getAuthHeaders = () => {
    const token = Cookies.get('token');
    if (!token) {
        return { "Content-Type": "application/json" };
    }
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export const getOrCreateCartByUserId = async (userId) => {
  try {
    const headers = getAuthHeaders();
    const res = await fetch(`${API_URL}/api/v1/Agaya/cart/${userId}`, {
      method: "GET",
      headers: headers, 
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch or create cart");
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data; 

  } catch (e) {
    console.error("Cart fetch/create error:", e);
    throw new Error("Can not get or create cart: " + e.message);
  }
};

export const addProductToCart = async (productId, cartId, quantity) => {
  try {
    const headers = getAuthHeaders();
    
    const res = await fetch(`${API_URL}/api/v1/Agaya/addto`, {
      method: "POST",
      headers: headers, 
      body: JSON.stringify({
        productId,
        cartId,
        quantity,
      }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add product to cart");
    }
    
    return await res.json();
    
  } catch (e) {
    console.error("Add to cart error:", e);
    throw new Error("Can not add product to cart: " + e.message);
  }
};