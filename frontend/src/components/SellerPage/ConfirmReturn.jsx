import React from 'react';

const ConfirmReturn = ({ orderId, onCompleteReturn }) => {
  const handleCompleteReturn = () => {
    if (window.confirm("Are you sure you want to complete this return? This action cannot be undone.")) {
      onCompleteReturn(orderId, "REFUNDED");
    }
  };

  return (
    <div className="p-4 px-10 border-t border-gray-200 bg-white">
      <h3 className="font-bold text-md mt-2 text-gray-800 mb-2">
        ยืนยันการคืนสินค้า
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        คลิกปุ่มด้านล่าง เพื่อยืนยันว่าได้รับสินค้าที่คืน
      </p>
      <button
        onClick={handleCompleteReturn}
        className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 cursor-pointer"
      >
        ยืนยันการคืนสินค้า
      </button>
    </div>
  );
};

export default ConfirmReturn;