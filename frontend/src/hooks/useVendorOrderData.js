import { useState, useEffect, useMemo } from "react";
import {
  getOrdersByVendor, 
  addOrderTrackingEvent, 
} from "../libs/orderService";
import { getMe } from "../libs/authService"; 
import { getVendorId } from "../libs/userService";

const VENDOR_ORDER_PAGES = {
  All: 6,
  ToShip: 1, 
  Shipping: 2,
  Completed: 3, 
  ReturnRefundCancel: 45, 
};

const useVendorOrderData = (page) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLatestStatusKey = (item) =>
    item.orderTracking?.length > 0
      ? item.orderTracking[item.orderTracking.length - 1].statusKey
      : "PENDING"; 

  const fetchOrderData = async () => {
    let vid = null;
    let uid = null;
    setLoading(true);
    setError(null);

    try {
      const meResponse = await getMe();
      uid = meResponse.data?._id;
      if (!uid) {
        throw new Error("User not authenticated.");
      }
      console.log("hehe uid", uid)

      const vendorIdResponse = await getVendorId(uid);
      vid = vendorIdResponse; 
      console.log("heheheheh", vid)
      
      if (!vid) {
        throw new Error("User is not a vendor or Vendor ID not found.");
      }

      const vendorOrders = await getOrdersByVendor(vid);
      
      if (vendorOrders?.success) {
        console.log(" vendorOrders",  vendorOrders)
        setOrders(vendorOrders.data?.orders || []);
      } else {
        throw new Error(vendorOrders?.message || "Failed to fetch vendor orders.");
      }

    } catch (err) {
      console.error("Vendor Order fetch error:", err);
      setError(err.message || "Failed to load orders.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []); 

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) {
      return [];
    }
    
    const currentPage = page === 4 || page === 5 ? VENDOR_ORDER_PAGES.ReturnRefundCancel : page;

    switch (currentPage) {
      // ที่ต้องจัดส่ง/รอแพ็ค (PENDING)
      case VENDOR_ORDER_PAGES.ToShip: 
        return orders.filter((item) => item.orderTracking.length === 1);

      // กำลังจัดส่ง (Shipping)
      case VENDOR_ORDER_PAGES.Shipping:
        return orders.filter((item) => {
          const latestStatusKey = getLatestStatusKey(item);
          return (
            latestStatusKey.includes("PICKED_UP") ||
            latestStatusKey.includes("IN_TRANSIT") ||
            latestStatusKey.includes("FAILED_ATTEMPT")
          );
        });

      // จัดส่งสำเร็จ (Completed)
      case VENDOR_ORDER_PAGES.Completed:
        return orders.filter((item) =>
          getLatestStatusKey(item).includes("COMPLETED") ||
          getLatestStatusKey(item).includes("DELIVERED") 
        );

      // คืนสินค้า/คืนเงิน/ยกเลิก
      case VENDOR_ORDER_PAGES.ReturnRefundCancel:
        return orders.filter((item) => {
          const latestStatusKey = getLatestStatusKey(item);
          return (
            latestStatusKey.includes("REFUNDED") ||
            latestStatusKey.includes("APPROVED") ||
            latestStatusKey.includes("RETURN_SHIPPED") ||
            latestStatusKey.includes("DISPUTED") ||
            latestStatusKey.includes("CANCELLED")
          );
        });
        
      case VENDOR_ORDER_PAGES.All:
      default:
        return orders;
    }
  }, [orders, page]);


  const updateOrderStatus = async (orderId, newStatus, description = null) => {
    try {
      await addOrderTrackingEvent(orderId, newStatus, description);
      await fetchOrderData(); 
      alert(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Status Update Failed:", err);
      alert(`Failed to update order status to ${newStatus}.`);
    }
  };
  
  return {
    orders,
    loading,
    error,
    fetchOrderData,
    filteredOrders,
    updateOrderStatus,
  };
};

export default useVendorOrderData;