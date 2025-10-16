import { useState } from "react";

const ConfirmationModal = ({ onConfirm, onCancel, isreceive, products }) => {
  const [selectItems, setSelectItems] = useState([]);

  const handleCheckboxChange = (productId) => {
    setSelectItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 transition-opacity">
      {isreceive && (
        <div className="bg-[#F5F5F5] p-8 max-w-lg w-full text-center transform transition-all scale-100 text-black">
          <h2 className="text-2xl font-semibold mb-4">
            คุณต้องการยืนยันได้รับสินค้าใช่หรือไม่
          </h2>
          <p className="text-black mb-8">
            หากคุณต้องการคุณต้องการยืนยันได้รับสินค้า
            <br />
            โปรดกดปุ่ม "ยืนยัน"
          </p>
          <div className="flex justify-center gap-4 bg-amber-50 mx-5">
            <button
              onClick={onCancel}
              className="flex-1 px-8 py-3 text-black bg-[#FF849B]/34 border-1 border-[#B71F3B] hover:bg-[#FF849B]/70 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-8 py-3 text-green-800 bg-green-200 hover:bg-green-300 transition-colors border-1 border-[#009E3F] cursor-pointer"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      )}

      {!isreceive && (
        <div className="max-w-4/7 w-full mx-auto p-6 bg-white my-10 border-2 border-[#878787]">
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center py-6 px-5 border-1 border-gray-200"
              >
                <div className="flex items-center gap-4 mb-2 md:mb-0 ">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(product._id)}
                    className="h-5 w-5 shrink-0 appearance-none border-2 border-white bg-gray-300 rounded-full checked:bg-[#47B486]  checked:ring-2 checked:ring-[#47B486] cursor-pointer"
                  />

                  <img
                    src={product.image[0]}
                    alt={product.productName}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex items-center justify-centers gap-1">
                    <p className="font-medium text-gray-800">
                      {product.productName}
                    </p>
                    <p className="text-gray-500">x1</p>
                  </div>
                </div>

                <div className="font-medium text-lg text-gray-900 mb-4 md:mb-0  text-center">
                  ${product.price}
                </div>

                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent">
                    <option disabled hidden>
                      {" "}
                      เหตุผล
                    </option>
                    <option>ไม่ต้องการสินค้าเเล้ว</option>
                    <option>สินค้าชำรุด</option>
                    <option>สินค้าไม่ตรงตามที่โฆษณา</option>
                  </select>
                  {/* <ChevronDownIcon /> */}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="bg-[#48B3AF] text-white font-semibold px-8 py-4 rounded-md hover:bg-teal-600 transition-colors cursor-pointer"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="bg-[#B71F3B] text-white font-semibold px-8 py-4 rounded-md hover:bg-red-800 transition-colors cursor-pointer"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
