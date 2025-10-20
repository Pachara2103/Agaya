import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrderStatus from "../OrderPage/OrderStatus";
const CompleteTracking = ({
  showstatus,
  showStatus,
  hideStatus,
  //   isOrderReceivePage,
  latestStatusKey,
  orderStatus,
  completedFilter
}) => {

  return (
    <div>
      {!showstatus&&completedFilter  && (
        <div
          onClick={showStatus}
          className="flex justify-center items-center p-3 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaChevronDown />
          <span className="ml-2">ดูรายละเอียดเพิ่มเติม</span>
        </div>
      )}
      {showstatus&& completedFilter && (
        <div className="space-y-2">
          <div className="h-0.5 mx-10 rounded-2xl bg-[#CCCCCC]"></div>
          <OrderStatus Status={orderStatus} />

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

export default CompleteTracking;
