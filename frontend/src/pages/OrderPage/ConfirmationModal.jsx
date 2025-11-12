import { useState } from "react";

const ConfirmationModal = ({ onConfirm, onCancel, isreceive, products }) => {
  const [selectItems, setSelectItems] = useState({});

  const [returnReasons, setReturnReasons] = useState({});

  const handleCheckboxChange = (productId, productQuantity) => {
    setSelectItems((prev) => {
      const newState = { ...prev };
      if (newState[productId]) {
        delete newState[productId];
        setReturnReasons((prevReasons) => {
          const newReasons = { ...prevReasons };
          delete newReasons[productId];
          return newReasons;
        });
      } else {
        newState[productId] = { quantity: productQuantity };
      }
      return newState;
    });
  };

  const handleReasonChange = (productId, reason) => {
    setReturnReasons((prev) => ({
      ...prev,
      [productId]: reason,
    }));
  };

  const handleConfirmReturn = () => {
    const selectedProductIds = Object.keys(selectItems);
    if (selectedProductIds.length === 0) {
      alert("กรุณาเลือกสินค้าที่ต้องการคืนอย่างน้อย 1 รายการ");
      return;
    }

    const productsToReturn = selectedProductIds
      .map((productId) => {
        const productDetail = products.find((p) => p.productId === productId);
        // if (!productDetail) {
        //   console.error(`Product detail not found for ID: ${productId}`);
        //   alert(
        //     `ข้อผิดพลาด: ไม่พบรายละเอียดสินค้าสำหรับ ID: ${productId} ในออเดอร์`
        //   );
        //   return null;
        // }
        const reason = returnReasons[productId];
        if (!reason || reason === "เหตุผล") {
          alert(`กรุณาระบุเหตุผลในการคืนสินค้าสำหรับ: ${productDetail.name}`);
          return null;
        }

        return {
          productId: productId,
          quantity: productDetail.quantity,
          reason: reason,
        };
      })
      .filter((item) => item !== null);

    if (productsToReturn.length !== selectedProductIds.length) {
      return;
    }

    const overallReason = productsToReturn[0].reason;
    onConfirm(overallReason, productsToReturn);
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            เลือกสินค้าและระบุเหตุผลในการคืน
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product, index) => (
              <div
                key={product.productId}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center py-6 px-5 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-2 md:mb-0 ">
                  <input
                    type="checkbox"
                    checked={!!selectItems[product.productId]}
                    onChange={() =>
                      handleCheckboxChange(product.productId, product.quantity)
                    }
                    className="h-5 w-5 shrink-0 appearance-none border-2 border-white bg-gray-300 rounded-full checked:bg-[#47B486] checked:ring-2 checked:ring-[#47B486] cursor-pointer"
                  />

                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex items-center justify-centers gap-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-gray-500">x{product.quantity}</p>
                  </div>
                </div>

                <div className="font-medium text-lg text-gray-900 mb-4 md:mb-0 text-center">
                  ${product.totalPrice.toLocaleString()}
                </div>

                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent"
                    disabled={!selectItems[product.productId]}
                    value={returnReasons[product.productId] || "เหตุผล"}
                    onChange={(e) =>
                      handleReasonChange(product.productId, e.target.value)
                    }
                  >
                    <option disabled hidden>
                      {" "}
                      เหตุผล
                    </option>
                    <option value="ไม่ต้องการสินค้าเเล้ว">
                      ไม่ต้องการสินค้าเเล้ว
                    </option>
                    <option value="สินค้าชำรุด">สินค้าชำรุด</option>
                    <option value="สินค้าไม่ตรงตามที่โฆษณา">
                      สินค้าไม่ตรงตามที่โฆษณา
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="bg-[#48B3AF] text-white font-semibold px-8 py-4 rounded-md hover:bg-teal-600 transition-colors cursor-pointer"
              onClick={handleConfirmReturn}
            >
              Confirm Return
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
