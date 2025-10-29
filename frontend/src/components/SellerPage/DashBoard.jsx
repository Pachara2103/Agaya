import useDashboardData from '../../hooks/useDashboardData';

const DashBoard = () => {
  const {
    toShipCount,
    shippingCount,
    disputedCount,
    totalOrdersCount,
    totalRevenue,
    productsSoldCount,
    bestSellerProduct,
    bestSellerSales,
  } = useDashboardData();

  return (
    <div className="max-w-[1100px] justify-center mx-auto space-y-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow ">
          <div className="bg-[#e9acb7] text-black text-xl font-bold p-5 rounded-t-lg -m-6 mb-0.5 ">
            ที่ต้องทำ
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-center h-full ">
            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">{toShipCount}</p>
              <p className="text-xl text-black mt-2">ที่ต้องจัดส่ง</p>
            </div>
            
            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">{shippingCount}</p>
              <p className="text-xl text-black mt-2">อยู่ระหว่างการจัดส่ง</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">{disputedCount}</p>
              <p className="text-xl text-black mt-2">คำขอที่มีปัญหา</p>
            </div>

            <div></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-[450px] flex flex-col">
          <div className="bg-[#e9acb7] text-xl text-black font-bold p-5 rounded-t-lg -m-6 mb-6">
            สินค้าขายดี
          </div>
          <div className="flex-grow flex items-center justify-center">
            {bestSellerProduct ? (
              <div className="text-center">
                <img
                  src={bestSellerProduct.image}
                  alt={bestSellerProduct.name}
                  className="mx-auto h-40 object-contain"
                />
                <p className="mt-4 font-semibold text-2xl text-black">{bestSellerProduct.name}</p>
                <p className="text-black mt-1 text-xl">
                  ยอดขาย <span className="text-blue-600 font-bold">{bestSellerSales}</span> ชิ้น
                </p>
              </div>
            ) : (
              <p>No sales data available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow h-[200px] flex flex-col">
        <div className="bg-[#ace9c5] text-xl text-black font-bold p-5 rounded-t-lg -m-6 mb-6">
          BUSINESS INSIGHTS
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="grid grid-cols-4 gap-6 text-center w-full">
            <div>
              <p className="text-4xl font-bold text-black">฿{totalRevenue.toFixed(2)}</p>
              <p className="text-xl text-black mt-1">ยอดขาย</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">{productsSoldCount}</p>
              <p className="text-xl text-black mt-1">สินค้าที่ขายได้</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">{totalOrdersCount}</p>
              <p className="text-xl text-black mt-1">คำสั่งซื้อ</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;