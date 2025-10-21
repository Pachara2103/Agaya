import OrderCard from "../OrderPage/OrderCard";
import "../OrderPage/scrollbar.css";
import useVendorOrderData from "../../hooks/useVendorOrderData"; 

import { useEffect, useState, useMemo } from "react"; 

const RETURN_PAGE_VALUE = 45; 

const Return = ({ isOrderReceivePage, isOtherPage, page }) => {
  const [myorder, setMyOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [select, setSelect] = useState("All");

  const {
    filteredOrders,
    updateOrderStatus, 
  } = useVendorOrderData(RETURN_PAGE_VALUE); 

  useEffect(() => {
    setMyOrder(filteredOrders);
    setTotalProducts(filteredOrders.length);
  }, [filteredOrders]);

  const changeSelect = (x) => {
    setSelect(x);
  };

  const isFocus = (x) => {
    return x == select;
  };
  
  const finalFilteredOrders = useMemo(() => {
    if (!myorder || myorder.length === 0) return [];
    
    const getLatestStatusKey = (item) =>
        item.orderTracking?.length > 0
          ? item.orderTracking[item.orderTracking.length - 1].statusKey
          : "";

    switch (select) {
      case "Return/Refund":
        return myorder.filter(item => {
          const key = getLatestStatusKey(item);
          return key.includes("REFUNDED") || key.includes("APPROVED") || key.includes("RETURN_SHIPPED") || key.includes("DISPUTED");
        });
      case "Cancel":
        return myorder.filter(item => getLatestStatusKey(item).includes("CANCELLED"));
      case "All":
      default:
        return myorder;
    }
  }, [myorder, select]); 

  return (
    <div className="bg-white font-sans overflow-auto h-full scrollbar ">
      <div className="w-full px-13 pt-10 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Return/ Refund/ Cancel</h2>
        <div className="border-b-1 border-black">
          <div className="flex space-x-20">
            <button
              className={`${
                isFocus("All") ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`} 
              onClick={() => changeSelect("All")}
            >
              All
            </button>
            <button
              className={`${
                isFocus("Return/Refund") ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`} 
              onClick={() => changeSelect("Return/Refund")}
            >
              Return/Refund
            </button>
            <button
              className={`${
                isFocus("Cancel") ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`} 
              onClick={() => changeSelect("Cancel")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto bg-[#f8f8f8] px-10 py-5">
        <h1 className="text-[16px] font-semibold text-gray-800 mb-7">
          รายการสินค้า {finalFilteredOrders.length} รายการ
        </h1>

        <div className="space-y-6">
          {finalFilteredOrders.map((item, index) => { 
            const latestStatusKey =
              item.orderTracking.length > 0
                ? item.orderTracking[item.orderTracking.length - 1].statusKey
                : "";
            return (
              <OrderCard
                key={item._id || index}
                orderId={item._id}
                shopName={item.storeName}
                products={item.contains}
                orderStatus={item.orderTracking}
                isOrderReceivePage={false} 
                latestStatusKey={latestStatusKey}
                isOtherPage={isOtherPage}
                page={page}
                storeAddress={item.vendorAddress}
                onUpdateStatus={updateOrderStatus} 
                isSellerPage={true} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Return;