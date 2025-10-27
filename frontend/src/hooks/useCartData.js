import { useState, useEffect } from "react";
import {
  getOrCreateCartByUserId,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} from "../libs/cartService";
import { getMe } from "../libs/authService";

const useCartData = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const fetchCartData = async () => {
    setIsLoading(true);
    setError(null);
    let currentUserId = null;

    try {
      const meResponse = await getMe();
      currentUserId = meResponse.data?._id;

      if (!currentUserId) {
        throw new Error("User not authenticated.");
      }

      const userCart = await getOrCreateCartByUserId(currentUserId);
      const fetchedCartId = userCart._id;
      setCartId(fetchedCartId);

      const fetchedItems = await getCartItems(fetchedCartId);

      let processedItems = fetchedItems.map((item) => ({
        _id: item._id,
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productId.productName || "Product",
        price: item.productId.price,
        image: item.productId.image,
        storeName: item.productId.vendorId?.storeName || "Unknown Store",
        stockQuantity: item.productId.stockQuantity,
      }));

      // Adjust quantities if they exceed stock and update backend
      for (let i = 0; i < processedItems.length; i++) {
        const item = processedItems[i];
        if (item.quantity > item.stockQuantity) {
          console.warn(
            `Adjusting quantity for ${item.productName} from ${item.quantity} to ${item.stockQuantity} due to insufficient stock.`
          );
          item.quantity = item.stockQuantity;
          await updateCartItemQuantity(item._id, {
            productId: item.productId._id,
            cartId: fetchedCartId,
            quantity: item.stockQuantity,
          });
        }
      }
      setCartItems(processedItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setError(error.message || "Failed to load cart.");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    const itemToUpdate = cartItems.find((item) => item._id === itemId);
    if (!itemToUpdate) return;

    let quantity = Math.max(1, newQuantity);
    if (itemToUpdate.stockQuantity !== undefined && quantity > itemToUpdate.stockQuantity) {
      quantity = itemToUpdate.stockQuantity;
      console.warn(`Quantity for ${itemToUpdate.productName} maximum at available stock: ${quantity}`);
    }

    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );

    if (cartId) {
      try {
        await updateCartItemQuantity(itemId, {
          productId: itemToUpdate.productId._id,
          cartId: cartId,
          quantity: quantity,
        });
      } catch (e) {
        console.error("Failed to update quantity on backend:", e);
        fetchCartData(); 
      }
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (e) {
      console.error("Failed to delete item from cart:", e);
    }
  };

  const selectedItems = cartItems.filter(item =>
    selectedItemIds.includes(item._id)
  );

  const selectedSubtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const selectedShipping = 0;
  const selectedTotal = selectedSubtotal + selectedShipping;

  const fullCartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const groupedCartItems = cartItems.reduce((groups, item) => {
    const storeName = item.storeName
    if (!groups[storeName]) {
      groups[storeName] = []
    }
    groups[storeName].push(item)
    return groups
  }, {})

  const toggleSelectItem = (itemId) => {
    setSelectedItemIds(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId)
      } else {
        return [...prev, itemId]
      }
    })
  }

  return {
    cartItems,
    isLoading,
    error,
    selectedItemIds,
    fetchCartData,
    handleQuantityChange,
    deleteItem,
    toggleSelectItem,
    groupedCartItems,
    selectedItems,
    selectedSubtotal,
    selectedShipping,
    selectedTotal,
    cartId
  };
};

export default useCartData;
