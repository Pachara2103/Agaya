import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { getOrCreateCartByUserId, getCartItems, updateCartItemQuantity, deleteCartItem } from '../libs/cartService';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const fetchCartData = useCallback(async () => {
    if (!isAuthenticated || authLoading) {
      setCartItems([]);
      setCartId(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const currentUserId = user?._id;

      if (!currentUserId) {
        throw new Error("User not authenticated for cart.");
      }

      const userCart = await getOrCreateCartByUserId(currentUserId);
      const fetchedCartId = userCart._id;
      setCartId(fetchedCartId);

      const fetchedItems = await getCartItems(fetchedCartId);

      let processedItems = fetchedItems.map((item) => {
        const product = item.productId;
        let quantity = item.quantity;

        if (product && quantity > product.stockQuantity) {
          console.warn(
            `Adjusting quantity for ${product.productName} from ${quantity} to ${product.stockQuantity} due to insufficient stock.`
          );
          quantity = product.stockQuantity;
        }
        return {
          _id: item._id,
          productId: product,
          quantity: quantity,
          productName: product?.productName || "Product",
          price: product?.price,
          image: product?.image,
          storeName: product?.vendorId?.storeName || "Unknown Store",
          stockQuantity: product?.stockQuantity,
        };
      });
      setCartItems(processedItems);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError(err.message || "Failed to load cart.");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated, authLoading]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleQuantityChange = useCallback(async (itemId, newQuantity) => {
    const itemToUpdate = cartItems.find((item) => item._id === itemId);
    if (!itemToUpdate) return;

    let quantity = Math.max(1, newQuantity);
    if (itemToUpdate.stockQuantity !== undefined && quantity > itemToUpdate.stockQuantity) {
      quantity = itemToUpdate.stockQuantity;
      console.warn(`Quantity for ${itemToUpdate.productName} maximum at available stock: ${quantity}`);
    }

    const originalCartItems = cartItems;
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
        setCartItems(originalCartItems); 
      }
    }
  }, [cartItems, cartId]);

  const deleteItem = useCallback(async (itemId) => {
    const originalCartItems = cartItems;
    setCartItems(cartItems.filter((item) => item._id !== itemId));

    try {
      await deleteCartItem(itemId);
    } catch (e) {
      console.error("Failed to delete item from cart:", e);
      setCartItems(originalCartItems); 
    }
  }, [cartItems]);

  const groupedCartItems = useMemo(() => {
    return cartItems.reduce((groups, item) => {
      const storeName = item.storeName;
      if (!groups[storeName]) {
        groups[storeName] = [];
      }
      groups[storeName].push(item);
      return groups;
    }, {});
  }, [cartItems]);

  const numberOfStoresInCart = useMemo(() => Object.keys(groupedCartItems).length, [groupedCartItems]);

  const toggleSelectItem = useCallback((itemId) => {
    setSelectedItemIds(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const selectedItems = useMemo(() => cartItems.filter(item => selectedItemIds.includes(item._id)), [cartItems, selectedItemIds]);

  const selectedSubtotal = useMemo(() => selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0), [selectedItems]);
  const selectedShipping = 0;
  const selectedTotal = useMemo(() => selectedSubtotal + selectedShipping, [selectedSubtotal, selectedShipping]);

  const contextValue = useMemo(() => ({
    cartItems,
    cartId,
    isLoading,
    error,
    selectedItemIds,
    refreshCart: fetchCartData,
    handleQuantityChange,
    deleteItem,
    toggleSelectItem,
    groupedCartItems,
    numberOfStoresInCart,
    selectedItems,
    selectedSubtotal,
    selectedShipping,
    selectedTotal,
  }), [cartItems, cartId, isLoading, error, selectedItemIds, fetchCartData, handleQuantityChange, deleteItem, toggleSelectItem, groupedCartItems, numberOfStoresInCart, selectedItems, selectedSubtotal, selectedShipping, selectedTotal]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
