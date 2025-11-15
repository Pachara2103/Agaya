import {FaCcVisa, FaCcMastercard} from "react-icons/fa";
import {BsCashCoin} from "react-icons/bs";

export const PaymentBox = ({
    subtotal,
    shipping,
    total,
    paymentMethod,
    onPaymentChange,
    onPlaceOrder,
    onCancelOrder
}) => (
    <div className="border-1 border-black rounded-md p-6 w-full md:max-w-sm">
        <div className="space-y-6">
            <div className="flex justify-between border-b pb-2">
                <span>ยอดรวมสินค้า:</span>
                <span>{subtotal.toFixed(2)}{" ฿"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
                <span>ค่าจัดส่ง:</span>
                <span>{shipping === 0 ? "ฟรี":`$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
                <span>รวม:</span>
                <span>{total.toFixed(2)} {" ฿"}</span>
            </div>
        </div>

        <div className="space-y-4 py-6">
            <div className="flex items-center">
                <input
                    type="radio"
                    id="payment_bank"
                    name="paymentMethod"
                    value="CREDIT_CARD"
                    checked={paymentMethod === 'CREDIT_CARD'}
                    onChange={onPaymentChange}
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="payment_bank" className="ml-3 flex-grow">Credit Card</label>
                <div className="flex items-center gap-2 text-2xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                </div>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    id="payment_cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={onPaymentChange}
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="payment_cod" className="ml-3 flex-grow">Cash on delivery</label>
                <div className="text-2xl">
                    <BsCashCoin />
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-4">
            <button
                onClick={onPlaceOrder}
                className="w-full bg-[#48B3AF] hover:bg-teal-600 text-white py-3 rounded-md transition-colors text-lg font-semibold cursor-pointer">
                Place Order
            </button>
            <button
                onClick={onCancelOrder}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors text-lg font-semibold cursor-pointer">
                Cancel Order
            </button>
        </div>
    </div>
);