import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrderStatus from "./OrderStatus";
import { ex2 } from "./exampleOrder";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
const StatusTracking = ({
  showstatus,
  showStatus,
  hideStatus,
  isOrderReceivePage,
  products
}) => {
  const [isReceive, setIsReceive] = useState(false);
  const [isReturn, setIsReturn] = useState(false);
  const [confirmReceive, setConfirmReceive] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);

  const openConfirmReceive = () => {
    setConfirmReceive(true);
  };
  const openConfirmReturn = () => {
    setConfirmReturn(true);
  };
  const closeConfirmReceive = () => {
    setConfirmReceive(false);
  };
  const closeConfirmReturn = () => {
    setConfirmReturn(false);
  };
  const handleConfirmReceive = () => {
    setIsReceive(true);
    closeConfirmReceive();
  };
  const handleConfirmReturn = () => {
    setIsReturn(true);
    closeConfirmReturn();
  };

  return (
    <div>

      {/* {!showstatus && !isOrderReceivePage && (
        <div
          onClick={showStatus}
          className="flex justify-center items-center p-3 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaChevronDown />
          <span className="ml-2">ดูรายละเอียดเพิ่มเติม</span>
        </div>
      )}
      {showstatus && !isOrderReceivePage && (
        <div className="space-y-2">
          <div className="h-0.5 mx-10 rounded-2xl bg-[#CCCCCC]"></div>
          <OrderStatus Status={ex2} />

          <div
            onClick={hideStatus}
            className="flex justify-center items-center p-3 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <FaChevronUp />
            <span className="ml-2">ซ่อน</span>
          </div>
        </div> 
      )} */}
      {/* ดูรายละเอียดเพิ่มเติม & ซ่อน comment ไว้เผื่อใช้ในอันอื่น */}

      {isOrderReceivePage && (
        <div className="space-y-2">
          <div className="h-0.5 mx-10 rounded-2xl bg-[#CCCCCC]"></div>
          <OrderStatus Status={ex2} />
          <div className="h-0.5 mx-10 rounded-2xl bg-[#CCCCCC]"></div>

          <div className="w-full  p-3 pt-1 text-white flex items-center justify-center">
            {!isReceive && !isReturn && (
              <div className="flex flex-row gap-10 items-center justify-center">
                <button
                  className="w-50 py-5 bg-[#48B3AF] rounded-md font-medium hover:bg-[#3b918e] cursor-pointer"
                  onClick={openConfirmReceive}
                >
                  Receive
                </button>
                <button
                  className="w-50 py-5 bg-[#B71F3B] rounded-md font-medium hover:bg-[#951a31] cursor-pointer"
                  onClick={openConfirmReturn}
                >
                  Return / Refund
                </button>
              </div>
            )}
            {isReceive && (
              <p className="font-bold text-xl text-[#48B3AF] py-5">
                ได้รับสินค้าเเล้ว
              </p>
            )}
            {isReturn && (
              <p className="font-bold text-xl text-[#B71F3B] py-5">ส่งคำขอคืนเงินเเล้ว</p>
            )}
          </div>
          {confirmReceive && (
            <ConfirmationModal
              onConfirm={handleConfirmReceive}
              onCancel={closeConfirmReceive}
              isreceive={true}
            />
          )}
          {confirmReturn && (
            <ConfirmationModal
              onConfirm={handleConfirmReturn}
              onCancel={closeConfirmReturn}
              isreceive={false}
              products={products}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StatusTracking;
