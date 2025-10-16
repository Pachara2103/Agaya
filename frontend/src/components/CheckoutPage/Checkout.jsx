import {useState} from "react";
import { useNavigate } from "react-router-dom";
import useCartData from "../../hooks/useCartData";
import useCartDeleteModal from "../../hooks/useCartDeleteModal";
import { CartTable } from "../CartPage/CartTable";
import { CartActionButtons } from "../CartPage/CartActionButtons";
import { CartTotalsSummary } from "../CartPage/CartTotalsSummary";
import {CartCouponSubmit} from "../CartPage/CartCouponSubmit";
import { ConfirmationModal } from "../CartPage/ConfirmationModal";

function CheckoutPage() {
    const {
        cartItems,
        isLoading,
        error,
        subtotal,
        shipping,
        total,
        fetchCartData,
        handleQuantityChange,
        deleteItem
    } = useCartData();

    const [couponCode, setCouponCode] = useState("")

    const {
        isModalOpen,
        handleRemoveClick,
        handleConfirmDelete,
        handleCancleDelete
    } = useCartDeleteModal(deleteItem);

    const navigate = useNavigate();
    const goToHome = () => navigate("/");
    const goToCart = () => navigate("/cart");

    if (isLoading) return <div className="text-center p-20 text-lg"><p>Loading Cart Data...</p></div>
    if (error) return <div className="text-center p-20 text-lg text-red-600"><p>Error: {error}</p></div>

    return (
        <div className="bg-white text-gray-800 p-4 sm:p-8 md:p-16">
            {isModalOpen && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancle={handleCancelDelete}
                />
            )}
            <div className="max-w-6xl mx-auto">
                <div className="text-sm text-gray-500 mb-8">
                    <span onClick={goToHome} className="cursor-pointer hover:text-red-600"> Home </span>
                    <span onClick={goToCart} className="cursor-pointer hover:text-red-600"> /Cart</span>
                    <span className="text-gray-800"> /Checkout</span>
                </div>

                <CartTable
                    items={cartItems}
                    onQuantityChange={handleQuantityChange}
                    onRemoveClick={handleRemoveClick}
                />

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
                    <CartCouponSubmit
                        couponCode={couponCode}
                        onCouponChange={(e) => setCouponCode(e.target.value)}
                    />

                    <CartTotalsSummary
                        subtotal={subtotal}
                        shipping={shipping}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;