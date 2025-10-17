import { useState, useEffect } from "react"
import { getOrdersByCustomer } from "../libs/orderService"
import { getMe } from "../libs/authService"

const useOrderData = () => {
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
    return {
        orders,
        fetchOrderData
    }
}

export default useOrderData