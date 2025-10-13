import OrderCard from "./OrderCard";
import './scrollbar.css';
const Order = () => {
  //example product
  const ordersByShop = [
    {
      shopName: "HAVIT Official Store",
      products: [
        {
          _id: "generated-id-1",
          productName: "HAVIT HV-G92 Gamepad",
          price: 120,
          image: ["https://i.postimg.cc/MGvFk4TQ/g92-2-500x500-1.png"],
        },
        {
          _id: "generated-id-3",
          productName: "Gaming Headset H2002d",
          price: 450,
          image: [],
        },
        {
          _id: "generated-id-4",
          productName: "RGB Gaming Mouse",
          price: 250,
          image: [],
        },
      ],
    },
    {
      shopName: "AK-Keyboard Thailand",
      products: [
        {
          _id: "generated-id-2",
          productName: "AK-900 Wired Keyboard",
          price: 960,
          image: ["https://i.postimg.cc/dQRgy7cp/ak-900-01-500x500-1.png"],
        },
        {
          _id: "generated-id-2",
          productName: "AK-900 Wired Keyboard",
          price: 960,
          image: [],
        },
      ],
    },
  ];

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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
