export const PaymentBox = ({
    subtotal,
    shipping,
    total,
    onProcessToPay
}) => (
    <div className="border-1 border-black rounded-md p-6 w-full md:max-w-sm">
        <h2 className="text-xl font-medium mb-6">ชำระค่าใช้จ่าย</h2>
        <div className="space-y-6">
            <div className="flex justify-between border-b pb-2">
                <span>ยอดรวมสินค้า:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
                <span>ค่าจัดส่ง:</span>
                <span>{shipping === 0 ? "ฟรี":`$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
                <span>ยอดรวมสินค้า:</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
        <button
            onClick={onProcessToPay}
            className="w-full bg-[#48B3AF] hover:bg-[#48b3afa6] text-white mt-6 py-4 rounded-md transition-colors cursor-pointer">
            ดำเนินการชำระเงินจ้า
        </button>
    </div>
);