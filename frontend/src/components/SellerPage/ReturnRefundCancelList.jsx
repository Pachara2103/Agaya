import React, { useEffect, useState, useCallback } from "react";

// --- MOCK API & SERVICE FUNCTIONS ---
// Replace these with your actual API calls.
const mockReturnRequests = [
  {
    _id: "RRC-001",
    customerName: "John Doe",
    customerId: "CUST-00123",
    orderId: "ORD-55432",
    statusKey: "RETURN_PENDING", // The status from your backend
    items: [
      {
        _id: "item-1",
        name: "LCD Monitor",
        quantity: 1,
        price: 650,
        imageUrl: "https://i.imgur.com/8AbPzc2.png",
      },
      {
        _id: "item-2",
        name: "H1 Gamepad",
        quantity: 1,
        price: 650,
        imageUrl: "https://i.imgur.com/kQkF4bQ.png",
      },
    ],
  },
  {
    _id: "RRC-002",
    customerName: "Jane Smith",
    customerId: "CUST-00456",
    orderId: "ORD-55890",
    statusKey: "CANCELLED", // The status from your backend
    items: [
      {
        _id: "item-3",
        name: "LCD Monitor",
        quantity: 1,
        price: 650,
        imageUrl: "https://i.imgur.com/8AbPzc2.png",
      },
      {
        _id: "item-4",
        name: "H1 Gamepad",
        quantity: 1,
        price: 650,
        imageUrl: "https://i.imgur.com/kQkF4bQ.png",
      },
    ],
  },
];

const fetchReturnRequestsByVendor = async (vendorId, { page, limit }) => {
  console.log(
    `Fetching page ${page} with limit ${limit} for vendor ${vendorId}`
  );
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // In a real app, you would fetch from your API here.
  return {
    requests: mockReturnRequests,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRequests: mockReturnRequests.length,
    },
  };
};

// Mock service functions from your original file to make this component runnable
const getMe = async () => ({ data: { _id: "user-123" } });
const getVendorId = async (userId) => "vendor-456";

// --- CHILD COMPONENT: ReturnRequestCard ---
// This component renders a single card from the list.

const ReturnRequestCard = ({ request }) => {
  // Determine display status based on the backend statusKey
  const getDisplayStatus = (statusKey) => {
    if (statusKey.startsWith("RETURN") || statusKey.startsWith("REFUND")) {
      return "Return/Refund";
    }
    if (statusKey.startsWith("CANCEL")) {
      return "Cancel";
    }
    return "Unknown";
  };
  const displayStatus = getDisplayStatus(request.statusKey);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 pb-4 border-b border-gray-200 gap-x-6 gap-y-1">
        <span>Customer name: {request.customerName}</span>
        <span>Customer ID: {request.customerId}</span>
        <span>order ID: {request.orderId}</span>
      </div>
      <div className="grid grid-cols-2 text-sm text-gray-500 font-medium py-4">
        <span>Customer name</span>
        <span className="text-left sm:text-center pl-16 sm:pl-0">Status</span>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {request.items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-5 items-center gap-4 text-sm"
          >
            {/* Item Details */}
            <div className="col-span-2 flex items-center gap-3">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-contain rounded-md"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-500">x{item.quantity}</p>
              </div>
            </div>
            {/* Status */}
            <div className="text-center text-gray-700">{displayStatus}</div>
            {/* Price */}
            <div className="text-center font-medium text-gray-800">
              ${item.price.toFixed(2)}
            </div>
            {/* Action */}
            <div className="text-right">
              <a href="#" className="text-gray-500 hover:text-red-500">
                รายละเอียดสินค้า
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      <div className="text-center pt-4 mt-4 border-t border-gray-200">
        <button className="text-gray-600 hover:text-red-600 text-sm font-medium">
          v Show more
        </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: ReturnRefundCancelList ---

const statusMap = {
  "Return/Refund": ["RETURN_PENDING", "REFUND_PENDING", "RETURN_APPROVED"],
  Cancel: ["CANCEL_PENDING", "CANCELLED"],
};

const ReturnRefundCancelList = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Return/Refund", "Cancel"];
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalRequests: 0,
  });

  const loadRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await getMe();
      const vendorId = await getVendorId(user.data._id);

      if (!vendorId) {
        console.warn("No vendorId found for this user.");
        setRequests([]);
        return;
      }

      const data = await fetchReturnRequestsByVendor(vendorId, {
        page: currentPage,
        limit: 5,
      });

      setRequests(data.requests || []);
      setPaginationInfo(data.pagination || { totalPages: 1, totalRequests: 0 });
    } catch (err) {
      console.error("Error loading return/refund/cancel requests:", err);
      setError(err.message);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filteredRequests = requests.filter((request) => {
    if (activeTab === "All") return true;
    const targetStatuses = statusMap[activeTab];
    return targetStatuses?.includes(request.statusKey);
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= paginationInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-12 text-gray-500">Loading...</div>;
    }
    if (error) {
      return (
        <div className="text-center py-12 text-red-500">Error: {error}</div>
      );
    }
    if (filteredRequests.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p>You have no requests in this category.</p>
        </div>
      );
    }
    return filteredRequests.map((request) => (
      <ReturnRequestCard key={request._id} request={request} />
    ));
  };

  const totalItemsCount = filteredRequests.reduce(
    (acc, req) => acc + req.items.length,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-light mb-6 text-gray-800">
          Return/Refund/Cancel page
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="mt-6 text-gray-600">
            <p>รายการสั่งสินค้าคืน {totalItemsCount} รายการ</p>
          </div>

          <div className="mt-6 space-y-6">{renderContent()}</div>

          {!isLoading && !error && paginationInfo.totalRequests > 0 && (
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
    </div>
  );
};

export default ReturnRefundCancelList;
