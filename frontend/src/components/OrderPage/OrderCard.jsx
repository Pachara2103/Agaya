import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import OrderStatus from "./OrderStatus";
const sampleTrackingData = [
  {
    id: 1,
    date: "30/09/2568",
    status: "Delivered",
    description: "พัสดุถูกจัดส่งสำเร็จแล้ว",
    icon: "check",
    completed: false,
  },
  {
    id: 2,
    date: "30/09/2568",
    time: "14:28",
    status: "In Transmit",
    description: "บริษัทขนส่งกำลังนำส่งพัสดุให้คุณ",
    icon: "truck",
    completed: false,
  },
  {
    id: 3,
    date: "30/09/2568",
    time: "14:28",
    status: "", // ไม่มี status หลัก
    description: "พัสดุถึงสาขาปลายทางแล้ว",
    icon: "dot",
    completed: false,
  },
  {
    id: 4,
    date: "30/09/2568",
    time: "14:28",
    status: "",
    description: "พัสดุออกจากศูนย์คัดแยกสินค้าแล้ว",
    icon: "dot",
    completed: true,
  },
  {
    id: 5,
    date: "30/09/2568",
    time: "14:28",
    status: "",
    description: "พัสดุถึงศูนย์คัดแยกสินค้า",
    icon: "dot",
    completed: true,
  },
  {
    id: 6,
    date: "30/09/2568",
    time: "14:28",
    status: "Arrived",
    description: "พัสดุถูกส่งมอบให้บริษัทขนส่งเรียบร้อยแล้ว",
    icon: "user",
    completed: true,
  },
];
const OrderCard = ({ shopName, products }) => {
  const [showstatus, setShowStatus] = useState(false);

  const showStatus = () => {
    setShowStatus(true);
  };
  const hideStatus = () => {
    setShowStatus(false);
    console.log("test");
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200">
      {/* head*/}
      <div className="flex justify-between items-center p-4 px-10 border-b border-gray-200 bg-[#EFEFEF]">
        <h2 className="font-bold text-gray-700">{shopName}</h2>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          cash on delivery
        </span>
      </div>

      {/* สินค้า */}
      <div className="p-4 px-10">
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product._id} className="flex items-center space-x-4">
              <img
                src={product.image[0]}
                alt="image"
                className="w-20 h-20 object-contain rounded-md"
              />
              <div className="flex-grow flex flex-row gap-5">
                <p className="text-gray-800 font-medium">
                  {product.productName}
                </p>
                <p className="text-black  font-medium">x1</p>
              </div>
              <div className="w-24 text-right">
                <p className="text-gray-800 font-semibold">
                  ${product.price.toLocaleString()}
                </p>
              </div>
              <div className="w-32 text-right">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  รายละเอียดสินค้า
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          <OrderStatus Status={sampleTrackingData} />

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
export default OrderCard;
