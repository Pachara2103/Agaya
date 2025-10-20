import OrderCard from "../OrderPage/OrderCard";
import "../OrderPage/scrollbar.css";
import useOrderData from "../../hooks/useOrderData";

import { useEffect, useState } from "react";

const Return = ({ isOrderReceivePage, isOtherPage, page }) => {
  const [myorder, setMyOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [select, setSelect] = useState("All");

  const {
    filteredOrders,
    cancelOrder,
    confirmReceive,
    submitReturnRequest,
    submitTrackingId,
  } = useOrderData(page);

  useEffect(() => {
    // fetchOrderData
    console.log("before filter", filteredOrders);
    setMyOrder(filteredOrders);
    setTotalProducts(filteredOrders.length);
  }, [filteredOrders]);

  const filter = (x) => {
    // const filterData = smt
    // setMyOrder(filterData);
  };

  const changeSelect = (x) => {
    setSelect(x);
    filter(x);
  };

  const isFocus = (x) => {
    return x == select;
  };

  //   filteredOrders = ordersByShop;
  // console.log("test")
  // orders.map((item, index) => {
  //   console.log(item, index)
  //   console.log(item.storeName)
  //   console.log(item.orderTracking.length === 1)
  // })
  // console.log("after filter", orders)

  return (
    <div className="bg-white font-sans overflow-auto h-full scrollbar ">
      <div className="w-full px-13 pt-10 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Return/ Refund/ Cancel</h2>
        <div className="border-b-1 border-black">
          <div className="flex space-x-20">
            <button
              className={`${
                isFocus("All") ? "text-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`}
              onClick={() => changeSelect("All")}
            >
              All
            </button>
            <button
              className={`${
                isFocus("Return/Refund") ? "text-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`}
              onClick={() => changeSelect("Return/Refund")}
            >
              Return/Refund
            </button>
            <button
              className={`${
                isFocus("Cancel") ? "text-pink-600" : "text-gray-600"
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
          รายการสินค้า {totalProducts} รายการ
        </h1>

        {/* using props 2 boolean to indicate page */}
        {/* 
          props
          key: for sort ?
          storeName: 
          products: ? populate on {quantity, price, name, }
        */}
        <div className="space-y-6">
          {myorder.map((item, index) => {
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
                isOrderReceivePage={isOrderReceivePage}
                latestStatusKey={latestStatusKey}
                isOtherPage={isOtherPage}
                page={page}
                storeAddress={item.vendorAddress}
                onCancel={cancelOrder}
                onReceive={confirmReceive}
                onSubmitReturn={submitReturnRequest}
                onSubmitTrackingId={submitTrackingId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Return;
