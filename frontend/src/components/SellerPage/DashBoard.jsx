import { useRef, useState } from "react";
import "./.css";

const DashBoard = () => {
  const [shopname, setShopName] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="bg-pink-100 text-pink-800 font-bold p-3 rounded-t-lg -m-6 mb-6">
            ที่ต้องทำ
          </div>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-gray-800">0</p>
              <p className="text-gray-500 mt-1">ที่ต้องจัดส่ง</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-800">0</p>
              <p className="text-gray-500 mt-1">คำสั่งจัดส่ง</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-800">0</p>
              <p className="text-gray-500 mt-1">
                คำขอยกเลิกสินค้า/คืนเงิน/คืนสินค้า
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-800">0</p>
              <p className="text-gray-500 mt-1">
                สินค้าที่ถูกระงับ/รอการโปรโมต
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-pink-100 text-pink-800 font-bold p-3 rounded-t-lg -m-6 mb-6">
            สินค้าขายดี
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/200x150" // Placeholder image
              alt="LCD Monitor"
              className="mx-auto h-32 object-contain"
            />
            <p className="mt-4 font-semibold">LCD Monitor</p>
            <p className="text-gray-500 mt-1">
              ยอดขาย <span className="text-blue-600 font-bold">27</span> ชิ้น
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <div className="bg-green-200 text-green-800 font-bold p-3 rounded-t-lg -m-6 mb-6">
          BUSINESS INSIGHTS
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">$0</p>
            <p className="text-gray-500 mt-1">ยอดขาย</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-gray-500 mt-1">จำนวนผู้เยี่ยมชม</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-gray-500 mt-1">คำสั่งซื้อ</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-gray-500 mt-1">อัตราการสั่งซื้อ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
