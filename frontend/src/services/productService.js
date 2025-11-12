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

export const getProducts = async (keyword,page, limit, category) => {
  const res = await fetch(`${API_URL}/products/?keyword=${keyword}&page=${page}&limit=${limit}&category=${category}`);
  return await res.json();
};

export const getProductsById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
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
  const data = await res.json();
  return { status: res.status, data };
};

export const getProductsByVendorId = async (keyword = '', category = '') => {
  try {
    const data = await fetch(`${API_URL}/products/vendor/my-products?keyword=${keyword}&category=${category}`, {
      method: "GET",
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
  if (!token) throw new Error("Authentication token not found");
  console.log("form image= ", formData.get("image"));
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};

export const getProductSalesByVendor = async () => {
  try {
    const data = await fetch(`${API_URL}/products/vendor/sales`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const res = await data.json();
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Can not get product sales");
  }
};

export const getPromotionProduct = async () => {
  const res = await getProducts("", 1, 10,"");
  const allProducts = res.data;
  const promotionProducts = allProducts.filter(item => item.promotion.active === true)
  if (promotionProducts.length == 0) return null;
  return promotionProducts;
};

export const updatePromotionStatus = async () => {
  await fetch(`${API_URL}/products/update-promotions`, {
    method: "POST",
    "Content-Type": "application/json",
  });
  return;
};

export const getFinalPrice = async (id) => {
  const res = await getProductsById(id)
  const product = res.data;

  if (!product.promotion.active) {
    return `${product.price}`;
  } else {
    const price = Math.ceil(((100 - product.promotion.promoDiscount) / 100) * product.price)
    return `${price}`;
  }
}

export const getTotalPrice = async (selectedItems) => {
  const pricePromises = selectedItems.map(item => getFinalPrice(item.productId._id));
  const prices = await Promise.all(pricePromises);

  const total = selectedItems.reduce((acc, item, index) => {
    const price = prices[index];
    return acc + (price * item.quantity);
  }, 0);
  return total;

}

