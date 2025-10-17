import { useState, useEffect, useMemo } from "react"
import { getOrdersByCustomer, addOrderTrackingEvent } from "../libs/orderService"
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
            case 1:
                return orders.filter((item) => (item.orderTracking.length === 1))
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
            case 3:
                return orders.filter((item) => getLatestStatusKey(item).includes("COMPLETED"));
            case 4:
                return orders.filter((item) => getLatestStatusKey(item).includes("REFUNDED"));
            case 5:
                return orders.filter((item) => getLatestStatusKey(item).includes("CANCELLED"));
            default:
                return orders;
        }
    }, [orders, page])

    const cancelOrder = async (orderId) => {
        try {
            const newStatus = "CANCELLED";
            // const description = "T^T no design related"; 
            
            await addOrderTrackingEvent(orderId, newStatus, null);
            
            await fetchOrderData(); 
            
            alert(`Order ${orderId} has been cancelled.`);
        } catch (err) {
            console.error("Cancellation Failed:", err);
            alert("Failed to cancel the order. Please try again.");
        }
    }

    return {
        orders,
        setOrders,
        fetchOrderData,
        filteredOrders,
        cancelOrder
    }
}

export default useOrderData