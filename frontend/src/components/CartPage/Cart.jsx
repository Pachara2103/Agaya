import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartData from "../../hooks/useCartData"
import { CartItemRow } from "./CartItemRow";
import { ConfirmationModal } from "./ConfirmationModal";
import useCartDeleteModal from "../../hooks/useCartDeleteModal";

// --- Main Cart Component ---
const Cart = () => {
  const {
    cartItems,
    isLoading,
    error,
    subtotal,
    shipping,
    total,
    fetchCartData,
    handleQuantityChange,
    deleteItem,
  } = useCartData();

  const [couponCode, setCouponCode] = useState("");

  const { 
    isModalOpen, 
    handleRemoveClick, 
    handleConfirmDelete, 
    handleCancelDelete 
  } = useCartDeleteModal(deleteItem);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  if (isLoading) {
     return <div className="text-center p-20 text-lg"><p>Loading Cart Data...</p></div>;
  }
  if (error) {
     return <div className="text-center p-20 text-lg text-red-600"><p>Error: {error}</p></div>;
  }

  return (
    <div className="bg-white text-gray-800 p-4 sm:p-8 md:p-16">
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8">
          <span onClick={() => goToHome()} className="cursor-pointer">
            {" "}
            Home
          </span>
          <span className="text-gray-800"> / Cart</span>
        </div>

        {/* Cart Table */}
        <div className="overflow-hidden mb-8 space-y-5">
          <div className="md:grid grid-cols-10 gap-4 p-6 border-1 border-[#D9D9D9] ">
            <div className="col-span-4 text-left">สินค้า</div>
            <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
            <div className="col-span-2 text-center">จำนวน</div>
            <div className="col-span-1 text-center">ราคารวม</div>
          </div>

          {cartItems.map((item) => (
            <CartItemRow
              key={item._id}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleRemoveClick={handleRemoveClick}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={goToHome}
            className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Return to shop
          </button>
          <button
            onClick={fetchCartData}
            className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Update cart
          </button>
        </div>

        {/* Coupon and Cart Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
          <div className="flex w-full md:w-[35vw] gap-4">
            <input
              type="text"
              placeholder="ใส่คูปองลดราคา"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-400 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
            />
            <button className="bg-[#48B3AF] hover:bg-[#48b3afa6] text-white px-8 py-3 rounded-md  transition-colors whitespace-nowrap cursor-pointer">
              กดใส่โค้ด
            </button>
          </div>

          <div className="border-1 border-black rounded-md p-6 w-full md:max-w-sm">
            <h2 className="text-xl font-medium mb-6">ยอดรวมในตะกร้าสินค้า</h2>
            <div className="space-y-6">
              <div className="flex justify-between border-b pb-2">
                <span>ยอดรวมสินค้า:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>ค่าจัดส่ง:</span>
                <span>
                  {shipping === 0 ? "ฟรี" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between ">
                <span>ยอดรวมสินค้า:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-[#48B3AF] hover:bg-[#48b3afa6] text-white mt-6 py-4 rounded-md transition-colors cursor-pointer">
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
