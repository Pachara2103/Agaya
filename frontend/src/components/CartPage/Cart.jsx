import useCartData from "../../hooks/useCartData";
import useCartDeleteModal from "../../hooks/useCartDeleteModal";
import { CartTable } from "./CartTable";
import { CartActionButtons } from "./CartActionButtons";
import { CartTotalsSummary } from "./CartTotalsSummary";
import { ConfirmationModal } from "./ConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

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
    groupedCartItems
  } = useCartData();

  const [couponCode, setCouponCode] = useState("");
  
  const { 
    isModalOpen, 
    handleRemoveClick, 
    handleConfirmDelete, 
    handleCancelDelete 
  } = useCartDeleteModal(deleteItem);

  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  console.log(groupedCartItems)

  if (isLoading) return <div className="text-center p-20 text-lg"><p>Loading Cart Data...</p></div>;
  if (error) return <div className="text-center p-20 text-lg text-red-600"><p>Error: {error}</p></div>;

  return (
    <div className="bg-white text-gray-800 p-4 sm:p-8 md:p-16">
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 mb-8">
          <span onClick={goToHome} className="cursor-pointer hover:text-red-600"> Home </span>
          <span className="text-gray-800"> / Cart</span>
        </div>

        {/* Cart Table Component */}
        <CartTable
          groupedItems={groupedCartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveClick={handleRemoveClick}
        />

        {/* Action Buttons Component */}
        <CartActionButtons
          onReturnToShop={goToHome}
          onUpdateCart={fetchCartData}
        />

        {/* Totals Summary Component */}
        <CartTotalsSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          couponCode={couponCode}
          onCouponChange={(e) => setCouponCode(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Cart;