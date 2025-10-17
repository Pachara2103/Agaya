import OrderCard from "./OrderCard";
import './scrollbar.css';
import useOrderData from "../../hooks/useOrderData";

const Order = ({isOrderReceivePage,isOtherPage, ordersByShop}) => {
  /*
    base on 2 boolean, using order hooks on this page
  */
  const { orders, fetchOrderData } = useOrderData()
  // fetchOrderData
  console.log(orders)
  const totalProducts = orders.length;
  console.log("test")
  orders.map((item, index) => {
    console.log(item, index)
    console.log(item.storeName)
    console.log(item.contains)
  })
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
          {orders.map((item, index) => (
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
