import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {ProductTable} from "./ProductTable";
import {CartCouponSubmit} from "./CartCouponSubmit";
import AddressDropdown from "./AddressDropdown";
import {PaymentBox} from "./PaymentBox";
import axios from "axios";
import Cookies from "js-cookie";
import { useCart } from "../../context/CartContext";
import * as paymentService from "../../services/paymentService"; 
import { API_URL } from "../../services/api";

function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [couponCode, setCouponCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshCart } = useCart();

    const checkoutData = location.state;

    if (!checkoutData || !checkoutData.items || checkoutData.items.length === 0) {
        useEffect(() => {navigate('/cart');}, [navigate]);
        return <div className="text-center p-20 text-lg"><p>ไม่มีสินค้าสำหรับชำระเงิน กำลังนำคุณกลับไปที่ตะกร้า...</p></div>
    }

    const {
        items: selectedItems,
        subtotal,
        shipping,
        total,
        cartId,
        selectedItemIds
    } = checkoutData;
    //console.log("hehe3", selectedItems);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        // console.log(address)
    };

    const handleCancelOrder = () => {
        navigate('/cart');
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

        if (!cartId) {
            setSubmitError("ไม่พบข้อมูลตะกร้าสินค้า");
            setIsSubmitting(false);
            return;
        }

        const orderPayload = {
            cartId: cartId,
            selectedItem: selectedItemIds,
            paymentMethod: paymentMethod,
            selectedAddress: selectedAddress
        };

        if (paymentMethod === 'CREDIT_CARD') { 
            try {
                const session = await paymentService.createCheckoutSession(orderPayload);
                window.location.href = session.url;
            } catch (err) {
                setSubmitError(err.message || "เกิดข้อผิดพลาดในการสร้างรายการชำระเงิน");
                setIsSubmitting(false);
            }
        } else { // Existing logic for COD
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error("กรุณาเข้าสู่ระบบ");

                const response = await axios.post(`${API_URL}/orders/checkout`, orderPayload, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                console.log("Backend Response Data:", response.data);

                if (response.data) {
                    alert("สั่งซื้อสินค้าสำเร็จ!");

                    if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                        navigate('/confirm-order');
                    } else {
                        console.error("ไม่พบข้อมูล order ID ใน response.data.data");
                    }
                }
                refreshCart()
            } catch(err) {
                setSubmitError(err.response?.data?.message || err.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const goToHome = () => navigate("/");
    const goToCart = () => navigate("/cart");

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
                    items={selectedItems}
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
                        paymentMethod={paymentMethod}
                        onPaymentChange={(e) => setPaymentMethod(e.target.value)}
                        onPlaceOrder={handleSubmitOrder}
                        onCancelOrder={handleCancelOrder}
                    />
                </div>
                {submitError && <p className="text-red-500 text-center mt-4">{submitError}</p>}
            </div>
        </div>
    );
}

export default CheckoutPage;