import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useCartData from "../../hooks/useCartData";
import {CartTable} from "../CartPage/CartTable";
import {ProductTable} from "./ProductTable";
import {CartCouponSubmit} from "./CartCouponSubmit";
import AddressDropdown from "./AddressDropdown";
import {PaymentBox} from "./PaymentBox";

function CheckoutPage() {
    const {
        cartItems,
        isLoading,
        error,
        subtotal,
        shipping,
        total,
    } = useCartData();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [couponCode, setCouponCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        if (!selectedAddress) {
            setSubmitError("กรุณาเลือกที่อยู่สำหรับจัดส่ง");
            setIsSubmitting(false);
            return;
        }

        try {
            
        } catch(err) {

        }
    }

    const navigate = useNavigate();
    const goToHome = () => navigate("/");
    const goToCart = () => navigate("/cart");

    if (isLoading) return <div className="text-center p-20 text-lg"><p>Loading Cart Data...</p></div>
    if (error) return <div className="text-center p-20 text-lg text-red-600"><p>Error: {error}</p></div>

    return (
        <div className="bg-white text-gray-800 p-4 sm:p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-sm text-gray-500 mb-8">
                    <span onClick={goToHome} className="cursor-pointer hover:text-red-600"> Home </span>
                    <span onClick={goToCart} className="cursor-pointer hover:text-red-600"> / Cart</span>
                    <span className="text-gray-800"> / Checkout</span>
                </div>

                <div className="mb-8">
                    <AddressDropdown onAddressSelect={handleAddressSelect}/>
                </div>

                <ProductTable
                    items={cartItems}
                />

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
                    <CartCouponSubmit
                        couponCode={couponCode}
                        onCouponChange={(e) => setCouponCode(e.target.value)}
                    />

                    <PaymentBox
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