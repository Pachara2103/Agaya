import { useState, useEffect, useMemo } from "react"
import { getOrdersByCustomer, addOrderTrackingEvent, cancelCustomerOrder, requestOrderReturn, submitReturnTrackingId } from "../libs/orderService"
import { getMe } from "../libs/authService"

const useOrderData = (page) => {
    const [orders, setOrders] = useState([])    

    const fetchOrderData = async () => {
        let cid = null

        try {
            const meResponse = await getMe();
            cid = meResponse.data?._id;
            // catch fetch
            if (!cid) {
                throw new Error("User not authenticated.");
            }
            const customerOrders = await getOrdersByCustomer(cid)
            setOrders(customerOrders?.data?.orders);    
        } catch (err) {
            console.error("Cart fetch error:", error);
            setOrders([]);
        }
    }
    useEffect(() => {
        fetchOrderData();
    }, []);

    const filteredOrders = useMemo(() => {
        if (!orders || orders.length === 0) {
            return [];
        }
        const getLatestStatusKey = (item) => item.orderTracking.length > 0 ? item.orderTracking[item.orderTracking.length - 1].statusKey : '';
        switch(page) {
            // ที่ต้องจัดส่ง
            case 1:
                return orders.filter((item) => (item.orderTracking.length === 1))
            // ที่ต้องได้รับ
            case 2:
                return orders.filter((item) => {
                    const latestStatusKey = getLatestStatusKey(item);
                    return item.orderTracking.length > 1 && (
                        latestStatusKey.includes("PICKED_UP") ||
                        latestStatusKey.includes("IN_TRANSIT") ||
                        latestStatusKey.includes("FAILED_ATTEMPT") ||
                        latestStatusKey.includes("DELIVERED")
                    );
                })
            // จัดส่งสำเร็จ
            case 3:
                return orders.filter((item) => getLatestStatusKey(item).includes("COMPLETED"));
            // การคืนสินค้า/คืนเงิน
            case 4:
                return orders.filter((item) => {
                    const latestStatusKey = getLatestStatusKey(item);
                    return item.orderTracking.length > 1 && (
                        latestStatusKey.includes("REFUNDED") || 
                        latestStatusKey.includes("APPROVED") || 
                        latestStatusKey.includes("RETURN_SHIPPED") || 
                        latestStatusKey.includes("DISPUTED") 
                    );
                })
            // การยกเลิกคำสั่งซื้อ
            case 5:
                return orders.filter((item) => getLatestStatusKey(item).includes("CANCELLED"));
            default:
                return orders;
        }
    }, [orders, page])

    const cancelOrder = async (orderId) => {
        try {
            // const description = "T^T no design related"; 
            
            await cancelCustomerOrder(orderId, null);
            
            await fetchOrderData(); 
            
            alert(`Order ${orderId} has been cancelled.`);
        } catch (err) {
            console.error("Cancellation Failed:", err);
            alert("Failed to cancel the order. Please try again.");
        }
    }

    const confirmReceive = async (orderId) => {
        try {
            await addOrderTrackingEvent(orderId, "COMPLETED", null);
            await fetchOrderData(); 
            alert(`Order ${orderId} confirmed as COMPLETED.`);
        } catch (err) {
            console.error("Receive Confirmation Failed:", err);
            alert("Failed to confirm order receipt.");
        }
    }

    const submitReturnRequest = async (orderId, products, reason) => {
        try {
            const result = await requestOrderReturn(orderId, products, reason);
            await fetchOrderData(); 
            alert(`Return request for Order ${orderId} submitted successfully!`);
            return result;
        } catch (err) {
            console.error("Return Request Failed:", err);
            alert(err.message || "Failed to submit return request. Check console for details.");
            return null;
        }
    }

    const submitTrackingId = async (orderId, trackingId) => {
        try {
            const result = await submitReturnTrackingId(orderId, trackingId);
            await fetchOrderData(); // Re-fetch orders to update the list
            alert(`Tracking ID ${trackingId} for Order ${orderId} submitted successfully!`);
            return result;
        } catch (err) {
            console.error("Submission Failed:", err);
            alert(err.message || "Failed to submit tracking ID. Please try again.");
            return null;
        }
    }

    return {
        orders,
        setOrders,
        fetchOrderData,
        filteredOrders,
        cancelOrder,
        confirmReceive, 
        submitReturnRequest,
        submitTrackingId
    }
}

export default useOrderData