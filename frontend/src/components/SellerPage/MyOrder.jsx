import OrderCard from "../OrderPage/OrderCard";
import "../OrderPage/scrollbar.css";
import useVendorOrderData from "../../hooks/useVendorOrderData";

import { use, useEffect, useState } from "react";

const MyOrder = ({ isOtherPage }) => {
  const [myorder, setMyOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [select, setSelect] = useState("All");
  const [page, setPage] = useState(6);
  const [isOrderReceivePage, setIsOrderReceivePage] = useState(true);

  const filterSelected = {
    All: 6,
    ToShip: 1,
    Completed: 3,
    Shipping: 2
  };

  const currentFilterValue = filterSelected[select];

  const {
    filteredOrders,
    updateOrderStatus
  } = useVendorOrderData(currentFilterValue);

  useEffect(() => {
    if (filteredOrders) {
      setMyOrder(filteredOrders);
      setTotalProducts(filteredOrders.length);
      console.log("new order= ", filteredOrders);
    }
  }, [filteredOrders]);


  const changeSelect = (x) => {
    setSelect(x);
  };

  const isFocus = (x) => {
    return x == select;
  };


  return (
    <div className="bg-white font-sans overflow-auto h-full scrollbar ">
      <div className="w-full px-13 pt-10 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">My Orders</h2>
        <div className="border-b-1 border-black">
          <div className="flex space-x-8">
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
                isFocus("ToShip") ? "text-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`}
              onClick={() => changeSelect("ToShip")}
            >
              To ship
            </button>
            <button
              className={`${
                isFocus("Shipping") ? "text-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`}
              onClick={() => changeSelect("Shipping")}
            >
              Shipping
            </button>
            <button
              className={`${
                isFocus("Completed") ? "text-pink-600" : "text-gray-600"
              }  pb-2 text-base font-medium cursor-pointer`}
              onClick={() => changeSelect("Completed")}
            >
              Completed
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
              <div>
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
                  onUpdateStatus={updateOrderStatus}
                  isSellerPage={true}
                  selectFilter = {select}
                  shippingAddress={item.shippingAddress}
                />

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
