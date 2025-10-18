import OrderCard from "./OrderCard";
import './scrollbar.css';
import useOrderData from "../../hooks/useOrderData";

const Order = ({isOrderReceivePage,isOtherPage, page}) => {
  /*
    base on 2 boolean, using order hooks on this page
  */
  const { filteredOrders, cancelOrder, confirmReceive, submitReturnRequest } = useOrderData(page)
  // fetchOrderData
  console.log("before filter", filteredOrders)
  const totalProducts = filteredOrders.length;
  // console.log("test")
  // orders.map((item, index) => {
  //   console.log(item, index)
  //   console.log(item.storeName)
  //   console.log(item.orderTracking.length === 1)
  // })
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
          {filteredOrders.map((item, index) => {
            const latestStatusKey = item.orderTracking.length > 0 ? item.orderTracking[item.orderTracking.length - 1].statusKey : '';
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
                onCancel={cancelOrder}
                onReceive={confirmReceive} 
                onSubmitReturn={submitReturnRequest}
              />
            )
          })}
        </div>


      </div>
    </div>
  );
};

export default Order;
