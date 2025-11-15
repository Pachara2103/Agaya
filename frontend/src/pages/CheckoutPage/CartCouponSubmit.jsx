export const CartCouponSubmit = ({
    couponCode,
    onCouponChange
}) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex w-full md:w-[35vw] gap-4">
            <input
                type="text"
                placeholder="ใส่คูปองลดราคา"
                value={couponCode}
                onChange={onCouponChange}
                className="border boder-gray-400 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
            />
            <button className="bg-[#48B3AF] hover:bg-[#48b3afa6] text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap cursor-pointer">
                กดใส่โค้ด
            </button>
        </div>
    </div>
);