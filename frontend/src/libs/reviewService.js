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

export const createReview = async (reviewData) => {
    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(reviewData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create review');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const getReviews = async (page = 1, limit = 10, productId = null) => {
    try {
        let url = `${API_URL}/reviews?page=${page}&limit=${limit}`;
        if (productId) {
            url += `&productId=${productId}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const getReview = async (reviewId) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch review');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const getReviewByTransaction = async (transactionId) => {
    try {
        console.log(55);
        console.log("transaction ID: ", transactionId);
        const response = await fetch(`${API_URL}/reviews/transaction/${transactionId}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch review');
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const updateReview = async (reviewId, updateData) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update review');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete review');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};

export const replyToReview = async (reviewId, responseContent) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ responseContent })
        });
        
        if (!response.ok) {
            throw new Error('Failed to reply to review');
        }
        
        return await response.json();
    } catch(err) {
        console.error("Error: ", err);
        throw new Error("Server Error");
    }
};