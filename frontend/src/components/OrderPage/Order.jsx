import OrderCard from "./OrderCard";
import './scrollbar.css';

const Order = ({isOrderReceivePage,isOtherPage, ordersByShop}) => {
  const totalProducts = ordersByShop.length;

  return (
    <div className="bg-[#F8F8F8] p-4 sm:p-8 font-sans overflow-auto h-150 scrollbar">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[16px] font-semibold text-gray-800 mb-7">
          รายการสินค้า {totalProducts} รายการ
        </h1>

        <div className="space-y-6">
          {ordersByShop.map((item, index) => (
            <OrderCard
              key={index}
              shopName={item.shopName}
              products={item.products}
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
