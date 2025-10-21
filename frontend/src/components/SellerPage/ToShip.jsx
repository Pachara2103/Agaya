import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ShippingPage = ({
  setTrackingId,
  trackingId,
  shippingAddress, 
  orderId,        
  onUpdateStatus,  
}) => {

  const handleShip = () => {
    if (!trackingId || trackingId.trim() === "") {
      alert("กรุณากรอกหมายเลขพัสดุ (Tracking ID)");
      return;
    }
    onUpdateStatus(orderId, "PICKED_UP", trackingId);
  };

  return (
    <div className="w-full mx-auto overflow-hidden border">
      <div className="p-6 px-10 min-h-[300px] ">
        <div className="space-y-3">
          <p className="text-base text-gray-800">
            ชื่อ-นามสกุลผู้ซื้อ : {shippingAddress?.name || "N/A"}
          </p>
          <p className="text-base text-gray-800">
            ที่อยู่ : {shippingAddress?.address || "N/A"}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Input Tracking ID"
            className="
              flex-grow w-full px-4 py-2 
              text-gray-700 bg-white 
              border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-teal-500
            "
          />
          <button
            onClick={handleShip}
            className="
              flex-shrink-0 px-6 py-3 
              text-black font-medium bg-[#48B3AF]
              hover:bg-teal-400 cursor-pointer 
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            "
          >
            Ship
          </button>
        </div>
      </div>
    </div>
  );
};

const ToShip = ({
  showstatus,
  showStatus,
  hideStatus,
  shippingAddress, 
  orderId,         
  onUpdateStatus, 
}) => {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div>
      {!showstatus && (
        <div
          onClick={showStatus}
          className="flex justify-center items-center p-3 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaChevronDown />
          <span className="ml-2">ดูรายละเอียดเพิ่มเติม</span>
        </div>
      )}
      {showstatus && (
        <div className="space-y-2">
          <div className="h-0.5 mx-10 rounded-2xl bg-[#CCCCCC]"></div>
          <ShippingPage
            setTrackingId={setTrackingId}
            trackingId={trackingId}
            shippingAddress={shippingAddress} 
            orderId={orderId}                
            onUpdateStatus={onUpdateStatus}   
          />

          <div
            onClick={hideStatus}
            className="flex justify-center items-center p-3 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <FaChevronUp />
            <span className="ml-2">ซ่อน</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToShip;