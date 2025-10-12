const DashBoard = () => {
  return (
    <div className="max-w-[1100px] justify-center mx-auto space-y-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow ">
          <div className="bg-[#e9acb7] text-black text-xl font-bold p-5 rounded-t-lg -m-6 mb-0.5 ">
            ที่ต้องทำ
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-center h-full ">
            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">0</p>
              <p className="text-xl text-black mt-2">ที่ต้องจัดส่ง</p>
            </div>
            
            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">0</p>
              <p className="text-xl text-black mt-2">คำสั่งจัดส่ง</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">0</p>
              <p className="text-xl text-black mt-2">คำขอยกเลิกสินค้า/</p>
              <p className="text-xl text-black">คืนเงิน/คืนสินค้า</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-5xl font-bold text-[#B71F3B]">0</p>
              <p className="text-xl text-black mt-2">สินค้าที่ถูกระงับ/</p>
              <p className="text-xl text-black">รอการโปรโมต</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-[450px] flex flex-col">
          <div className="bg-[#e9acb7] text-xl text-black font-bold p-5 rounded-t-lg -m-6 mb-6">
            สินค้าขายดี
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/djpeia078/image/upload/v1757964044/agaya-products/product-1757964042052.png"
                alt="LCD Monitor"
                className="mx-auto h-40 object-contain"
              />
              <p className="mt-4 font-semibold text-2xl text-black">LCD Monitor</p>
              <p className="text-black mt-1 text-xl">
                ยอดขาย <span className="text-blue-600 font-bold">27</span> ชิ้น
              </p>
            </div>
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
              <p className="text-4xl font-bold text-black">$0</p>
              <p className="text-xl text-black mt-1">ยอดขาย</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">0</p>
              <p className="text-xl text-black mt-1">จำนวนผู้เยี่ยมชม</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">0</p>
              <p className="text-xl text-black mt-1">คำสั่งซื้อ</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">0</p>
              <p className="text-xl text-black mt-1">อัตราการสั่งซื้อ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;