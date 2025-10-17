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

      setCartItems(
        fetchedItems.map((item) => ({
          _id: item._id,
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productId.productName || "Product",
          price: item.productId.price,
          image: item.productId.image,
          storeName: item.productId.vendorId?.storeName || "Unknown Store",
        }))
      );
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
    const quantity = Math.max(1, newQuantity);

    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );

    const itemToUpdate = cartItems.find((item) => item._id === itemId);

    if (itemToUpdate && cartId) {
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

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );
  // const shipping = 0;
  // const total = subtotal + shipping;
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
    subtotal: fullCartTotal,
    shipping: 0,
    total: fullCartTotal + 0,
    selectedItemIds,
    fetchCartData,
    handleQuantityChange,
    deleteItem,
    groupedCartItems,
    toggleSelectItem,
    selectedItems,
    selectedSubtotal,
    selectedShipping,
    selectedTotal,
    cartId
  };
};

export default useCartData;
