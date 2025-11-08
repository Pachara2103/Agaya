import { useCart } from "../../context/CartContext"; 
import useCartDeleteModal from "../../hooks/useCartDeleteModal";
import { CartTable } from "./CartTable";
import { CartActionButtons } from "./CartActionButtons";
import { CartTotalsSummary } from "./CartTotalsSummary";
import { ConfirmationModal } from "./ConfirmationModal";
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const {
    isLoading,
    error,
    selectedItemIds,
    refreshCart: fetchCartData, 
    handleQuantityChange,
    deleteItem,
    toggleSelectItem,
    groupedCartItems,
    selectedItems,
    selectedSubtotal,
    selectedShipping,
    selectedTotal,
    cartId
  } = useCart(); 
  
  const { 
    isModalOpen, 
    handleRemoveClick, 
    handleConfirmDelete, 
    handleCancelDelete 
  } = useCartDeleteModal(deleteItem);

  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  // console.log(groupedCartItems)

  const handleProcessToCheckout = () => {
    if (selectedItems.length === 0) {
      alert("กรุณาเลือกสินค้าอย่างน้อย 1 ชิ้น");
      return;
    }

    const checkoutData = {
      items: selectedItems,
      subtotal: selectedSubtotal,
      shipping: selectedShipping,
      total: selectedTotal,
      cartId: cartId,
      selectedItemIds: selectedItemIds
    };
    navigate('/checkout', {state: checkoutData});
  };

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
          isSelected={selectedItemIds}
          onToggleSelect= {toggleSelectItem}
        />

        {/* Action Buttons Component */}
        <CartActionButtons
          onReturnToShop={goToHome}
          onUpdateCart={fetchCartData}
        />

        <div className="flex justify-end">
          {/* Totals Summary Component */}
          <CartTotalsSummary
            subtotal={selectedSubtotal}
            shipping={selectedShipping}
            total={selectedTotal}
            onProcessToCheckout={handleProcessToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;