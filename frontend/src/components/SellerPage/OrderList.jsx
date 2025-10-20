import React, { useEffect, useState, useCallback } from "react";
import OrderItem from "./OrderItem.jsx";
import { getMe } from "../../libs/authService.js";
import { getVendorId } from "../../libs/userService.js";
import { fetchOrdersByVendor } from "../../libs/orderService.js";

// NOTE: To resolve the compilation errors, the required components and service
// functions are included directly within this file as placeholders.
// In a real application, these would be in separate files as per the original imports.

// --- Main Component ---

const statusMap = {
  "To ship": ["ORDER_RECEIVED", "PICKED_UP"],
  Shipping: ["IN_TRANSIT", "FAILED_ATTEMPT"],
  Completed: ["DELIVERED", "COMPLETED"],
};

const OrderList = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "To ship", "Shipping", "Completed"];
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalOrders: 0,
  });

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const user = await getMe();
      const userId = user.data._id;
      const vendorId = await getVendorId(userId);

      if (!vendorId) {
        console.warn("No vendorId found for this user.");
        setOrders([]);
        return;
      }
      console.log("Fetching orders for vendorId:", vendorId);

      const data = await fetchOrdersByVendor(vendorId, {
        page: currentPage,
        limit: 5,
      });
      console.log("Fetched orders data:", data);

      setOrders(data.orders || []);
      setPaginationInfo(data.pagination || { totalPages: 1, totalOrders: 0 });
    } catch (err) {
      console.error("Error loading orders:", err);
      setError(err.message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All") return true;
    const currentStatus =
      order.orderTracking[order.orderTracking.length - 1]?.statusKey;
    const targetStatuses = statusMap[activeTab];
    return targetStatuses?.includes(currentStatus);
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= paginationInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12 text-gray-500">Loading orders...</div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-12 text-red-500">Error: {error}</div>
      );
    }
    if (filteredOrders.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p>You have no orders in this category.</p>
        </div>
      );
    }
    return filteredOrders.map((order) => (
      <OrderItem key={order._id} order={order} />
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">My Orders</h1>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 space-y-6">{renderContent()}</div>

        {!isLoading && !error && paginationInfo.totalOrders > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {paginationInfo.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationInfo.totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
