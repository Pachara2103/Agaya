export const CartTotalsSummary = ({ 
    subtotal, 
    shipping, 
    total, 
    couponCode, 
    onCouponChange 
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
    {/* Coupon Input */}
    <div className="flex w-full md:w-[35vw] gap-4">
      <input
        type="text"
        placeholder="ใส่คูปองลดราคา"
        value={couponCode}
        onChange={onCouponChange}
        className="border border-gray-400 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
      />
      <button className="bg-[#48B3AF] hover:bg-[#48b3afa6] text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap cursor-pointer">
        กดใส่โค้ด
      </button>
    </div>

    {/* Price Summary Box */}
    <div className="border-1 border-black rounded-md p-6 w-full md:max-w-sm">
      <h2 className="text-xl font-medium mb-6">ยอดรวมในตะกร้าสินค้า</h2>
      <div className="space-y-6">
        <div className="flex justify-between border-b pb-2">
          <span>ยอดรวมสินค้า:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>ค่าจัดส่ง:</span>
          <span>{shipping === 0 ? "ฟรี" : `$${shipping.toFixed(2)}`}</span>
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
);