import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {ProductTable} from "./ProductTable";
import {CartCouponSubmit} from "./CartCouponSubmit";
import AddressDropdown from "./AddressDropdown";
import {PaymentBox} from "./PaymentBox";
import axios from "axios";
import Cookies from "js-cookie";

function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [couponCode, setCouponCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

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
        console.log(address)
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

        try {
            const token = Cookies.get('token');
            if (!token) throw new Error("กรุณาเข้าสู่ระบบ");

            const orderPayload = {
                cartId: cartId,
                selectedItem: selectedItemIds,
                paymentMethod: paymentMethod,
                selectedAddress: selectedAddress
            };

            const response = await axios.post('http://localhost:5000/api/v1/Agaya/orders/checkout', orderPayload, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("Backend Response Data:", response.data);

            if (response.data) {
                alert("สั่งซื้อสินค้าสำเร็จ!");

                if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                    const newOrderId = response.data.data[0].order._id;
                    navigate('/confirm-order');
                    //navigate(`/order-status/${newOrderId}`); // พาไปหน้าติดตามสถานะ
                } else {
                    console.error("ไม่พบข้อมูล order ID ใน response.data.data");
                    //navigate('order-history');
                }
            }
        } catch(err) {
            setSubmitError(err.response?.data?.message || err.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
        } finally {
            setIsSubmitting(false);
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