import OrderCard from "./OrderCard";
import './scrollbar.css';
import useOrderData from "../../hooks/useOrderData";

const Order = ({isOrderReceivePage,isOtherPage, page}) => {
  /*
    base on 2 boolean, using order hooks on this page
  */
  const { orders, setOrders, fetchOrderData } = useOrderData()
  // fetchOrderData
  // console.log("before filter", orders)
  let totalProducts = orders.length;
  // console.log("test")
  let filteredOrders = orders;
  // orders.map((item, index) => {
  //   console.log(item, index)
  //   console.log(item.storeName)
  //   console.log(item.orderTracking.length === 1)
  // })
  if (page === 1) {
    filteredOrders = orders.filter((item) => (item.orderTracking.length === 1))
  } else if (page === 2) {
    filteredOrders = orders.filter((item) => {
      const latestStatusKey = item.orderTracking[item.orderTracking.length - 1].statusKey;
      return item.orderTracking.length > 1 && (
        latestStatusKey.includes("PICKED_UP") ||
        latestStatusKey.includes("IN_TRANSIT") ||
        latestStatusKey.includes("FAILED_ATTEMPT")
      );
    })
  } else if (page === 3) {
    filteredOrders = orders.filter((item) => (item.orderTracking[item.orderTracking.length - 1].statusKey.includes("DELIVERED")))
  } else if (page === 4) {
    filteredOrders = orders.filter((item) => (item.orderTracking[item.orderTracking.length - 1].statusKey.includes("CANCELLED")))
  } else if (page === 5) {
    filteredOrders = orders.filter((item) => (item.orderTracking[item.orderTracking.length - 1].statusKey.includes("REFUNDED")))
  }
  totalProducts = filteredOrders.length
  // console.log("after filter", orders)
  return (
    <div className="bg-[#F8F8F8] p-4 sm:p-8 font-sans overflow-auto h-150 scrollbar">
      <div className="max-w-4xl mx-auto">
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
          {filteredOrders.map((item, index) => (
            <OrderCard
              key={index}
              shopName={item.storeName}
              products={item.contains}
              isOrderReceivePage={isOrderReceivePage}
              isOtherPage={isOtherPage}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default Order;
