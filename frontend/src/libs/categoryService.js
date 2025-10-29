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

export const getCategoryById = async(id) => {
    try {
        const headers = getAuthHeaders();
        const res = await fetch(`${API_URL}/category/${id}`, {
            headers: headers,
        });
        if (!res.ok) {
             throw new Error("Failed to fetch Category");
        }
        const category = await res.json();
        return category;
    } catch (err) {
        throw new Error("Cannot get Category");
    }
}

export const getCategories = async() =>  {
    try {
        const headers = getAuthHeaders();
        const res = await fetch(`${API_URL}/category/`, {
            headers: headers,
        });
        if (!res.ok) {
             throw new Error("Failed to fetch Categories");
        }
        const categories = await res.json();
        return categories;
    } catch (err) {
        throw new Error("Cannot get Categories");
    }
}

export const createCategory = async(Categorydata) => {
    try {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_URL}/category`, {
             method: "POST",
             headers: headers,
             body: JSON.stringify(Categorydata), 
        });

        if (!response.ok) {
            throw new Error("Failed to create category");
        }
        const createdCatagory = await response.json();
        return createdCatagory;
    } catch (error) {
        throw new Error("Cannot create Categories");
    }
}

export const editCategory = async(id, Categorydata) => {
    try {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_URL}/category/${id}`, {
             method: "PUT",
             headers: headers,
             body: JSON.stringify(Categorydata), 
        });

        if (!response.ok) {
            throw new Error("Failed to Edit category");
        }
        const editedCategory = await response.json();
        return editedCategory;
    } catch (error) {
        throw new Error("Cannot edit Categories");
    }
}

export const deleteCategory = async(id) => {
    try {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_URL}/category/${id}`, {
             method: "DELETE",
             headers: headers,
        });

        if (!response.ok) {
            throw new Error("Failed to Delete category");
        }
        const deletedCategory = await response.json();
        return deletedCategory;
    } catch (error) {
        throw new Error("Cannot delete Categories");
    }
}

export const getCategoryQuantity = async (type) => {
  const res = await fetch(`${API_URL}/category/count/${type}`, {
    method: "GET",
    "Content-Type": "application/json",
  });
  const data =await res.json();
  const categoryQuantity = data.data;
  return categoryQuantity;
};
