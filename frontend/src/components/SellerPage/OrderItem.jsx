import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiCheckCircle,
  FiTruck,
  FiBox,
  FiClock,
  FiAlertCircle,
  FiMapPin,
} from "react-icons/fi";
import { FaBox } from "react-icons/fa";

// --- Helper Maps for Status ---

const statusDisplayMap = {
  ORDER_RECEIVED: "To Ship",
  PICKED_UP: "To Ship",
  IN_TRANSIT: "Shipping",
  FAILED_ATTEMPT: "Shipping",
  DELIVERED: "Completed",
  COMPLETED: "Completed",
};

const statusStyleMap = {
  ORDER_RECEIVED: "text-blue-600",
  PICKED_UP: "text-blue-600",
  IN_TRANSIT: "text-orange-600",
  FAILED_ATTEMPT: "text-red-600",
  DELIVERED: "text-green-600",
  COMPLETED: "text-green-600",
};

const iconMap = {
  ORDER_RECEIVED: <FiMapPin className="text-gray-500" />,
  PICKED_UP: <FiBox className="text-indigo-500" />,
  IN_TRANSIT: <FiTruck className="text-blue-500" />,
  FAILED_ATTEMPT: <FiAlertCircle className="text-red-500" />,
  DELIVERED: <FaBox className="text-green-500" />,
  COMPLETED: <FiCheckCircle className="text-green-500" />,
  DEFAULT: <FiClock className="text-gray-500" />,
};

// --- Sub-Components ---

// ⭐️ THIS IS THE MODIFIED COMPONENT ⭐️
const ShippingTimeline = ({ history }) => (
  <div className="mt-4 pt-4 border-t">
    <h3 className="text-md font-semibold text-gray-700 mb-4">
      Shipping History
    </h3>
    <div>
      {history.map((event, index) => (
        <div key={index} className="flex">
          {/* Column 1: Icon and connecting line */}
          <div className="flex flex-col items-center mr-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white text-lg z-10">
              {iconMap[event.statusKey] || iconMap.DEFAULT}
            </div>
            {/* The line is only rendered if it's NOT the last item */}
            {index < history.length - 1 && (
              <div className="flex-grow w-0.5 bg-gray-200"></div>
            )}
          </div>

          {/* Column 2: Event Details */}
          {/* The padding-bottom here creates the space that the line in Column 1 will fill */}
          <div className="pb-6">
            <p className="font-semibold text-gray-800 -mt-1">
              {event.statusKey.replace(/_/g, " ")}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(event.timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OrderDetails = ({ order, onUpdateStatus }) => {
  const [description, setDescription] = useState("");
  const currentStatusKey =
    order.orderTracking[order.orderTracking.length - 1].statusKey;

  // Determine the next logical status
  const getNextStatus = () => {
    switch (currentStatusKey) {
      case "ORDER_RECEIVED":
        return "PICKED_UP";
      case "PICKED_UP":
        return "IN_TRANSIT";
      case "IN_TRANSIT":
        return "DELIVERED";
      // Add other transitions as needed
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  const handleUpdateClick = () => {
    if (!nextStatus) return;
    if (nextStatus === "IN_TRANSIT" && !description.trim()) {
      alert("Please provide a tracking number or shipping details.");
      return;
    }
    // Call the function passed down from OrderList
    onUpdateStatus(
      order._id,
      nextStatus,
      description || `Status updated to ${nextStatus.replace("_", " ")}`
    );
    setDescription(""); // Clear the input field
  };

  return (
    <div className="mt-4 pt-4 border-t">
      {/* Conditionally render the update form */}
      {nextStatus && (
        <div className="p-4 mb-6 bg-gray-50 rounded-lg space-y-3">
          <h4 className="font-semibold text-gray-700">Update Order Status</h4>
          <p className="text-sm text-gray-600">
            Current Status:{" "}
            <span className="font-bold">
              {currentStatusKey.replace("_", " ")}
            </span>
          </p>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tracking Number / Description (Optional for Picked Up)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                nextStatus === "IN_TRANSIT"
                  ? "Enter tracking number"
                  : "e.g., Courier is on the way"
              }
              className="text-black w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            onClick={handleUpdateClick}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow"
          >
            Mark as {nextStatus.replace("_", " ")}
          </button>
        </div>
      )}

      {/* The existing Shipping Timeline */}
      <ShippingTimeline history={order.orderTracking} />
    </div>
  );
};

// --- Main Component ---
// (No changes needed below this line, it remains the same as before)

const OrderItem = ({ order, onUpdateStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatusObject =
    order.orderTracking?.[order.orderTracking.length - 1];
  const currentStatusKey = currentStatusObject?.statusKey || "UNKNOWN";
  const statusText = statusDisplayMap[currentStatusKey] || "Unknown";
  const statusClass = statusStyleMap[currentStatusKey] || "text-gray-600";
  const totalAmount = order.orderTotal;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <div className="p-4 sm:p-6">
        {order.contains.map((product) => (
          <div
            key={product.productId}
            className="grid grid-cols-12 gap-4 items-center py-4 border-b last:border-b-0"
          >
            <div className="col-span-12 sm:col-span-5 flex items-center space-x-4">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md bg-gray-200"
              />
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">x{product.quantity}</p>
              </div>
            </div>
            <div
              className={`col-span-6 sm:col-span-2 text-left sm:text-center font-medium ${statusClass}`}
            >
              <span className="sm:hidden text-gray-500 font-normal">
                Status:{" "}
              </span>
              {statusText}
            </div>
            <div className="col-span-6 sm:col-span-3 text-left sm:text-right text-gray-800">
              <span className="sm:hidden text-gray-500">Price: </span>$
              {product.totalPrice.toFixed(2)}
            </div>
            <div className="col-span-12 sm:col-span-2 flex justify-end sm:justify-center mt-2 sm:mt-0">
              <Link
                to={`/productdetail/${product.productId}`}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
        {isOpen && (
          <OrderDetails order={order} onUpdateStatus={onUpdateStatus} />
        )}
      </div>
      <div className="bg-gray-50 p-4 rounded-b-lg flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm text-gray-600 hover:text-red-600"
        >
          {isOpen ? "Show less" : "Show more"}
          <FiChevronDown
            className={`ml-1 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div>
          <span className="text-gray-600 mr-2">Order Total:</span>
          <span className="text-xl font-semibold text-red-600">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Prop Types ---
const containPropTypes = PropTypes.shape({
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
});
const trackingEventPropTypes = PropTypes.shape({
  timestamp: PropTypes.string.isRequired,
  statusKey: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});
OrderItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderTotal: PropTypes.number.isRequired,
    contains: PropTypes.arrayOf(containPropTypes).isRequired,
    orderTracking: PropTypes.arrayOf(trackingEventPropTypes).isRequired,
  }).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};
ShippingTimeline.propTypes = {
  history: PropTypes.arrayOf(trackingEventPropTypes).isRequired,
};
OrderDetails.propTypes = {
  order: OrderItem.propTypes.order,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default OrderItem;
