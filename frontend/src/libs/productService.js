import { API_URL } from "./api";
import Cookies from "js-cookie";
import { getMe } from "./userService";

const getProducts = async (url, token) => {
  try {
    const data = await fetch(`${url}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const products = data.json();
    return products;
  } catch (err) {
    throw new Error("Can not get products");
  }
};
const getProductsById = async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    return "Permission is Denied!";
  }
  try {
    const data = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    return res;
  } catch (err) {
    throw new Error("Can not get product");
  }
};

const getProductsByVendorId = async () => {
  const token = Cookies.get("token");
  if (!token) {
    return "Permission is Denied!";
  }
  try {
    const data = await fetch(`${API_URL}/products/vendor/my-products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    console.log("dataaaaaaaaaaaaaaaaa = ", res);

    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Can not get product");
  }
};

const createProduct = async (newProduct) => {
  const token = Cookies.get("token");
  if (!token) {
    return "Permission is Denied!";
  }

  try {
    console.log(JSON.stringify(newProduct));
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newProduct,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Can not create product");
  }
};

const updateProduct = async (id, data) => {
  const token = Cookies.get("token");
  if (!token) {
    return "Permission is Denied!";
  }
  try {
    console.log(JSON.stringify(data));
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const updatedProduct = await res.json();
    return updatedProduct;
  } catch (e) {
    console.log(e);
    throw new Error("Can not update product");
  }
};
const deleteProduct= async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    return "Permission is Denied!";
  }
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (e) {
    throw new Error("Can not delete product");
  }
};

export {
  getProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  getProductsByVendorId,
};
