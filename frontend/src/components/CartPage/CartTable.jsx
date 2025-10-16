import { StoreGroup } from "./StoreGroup"; 

export const CartTable = ({ items, onQuantityChange, onRemoveClick }) => {
  const totalQuantity = items.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
  
  return (
    <div>
      <div className="overflow-hidden mb-8 space-y-5">
        <div className="md:grid grid-cols-10 gap-4 p-6 border-1 border-[#D9D9D9] ">
          <div className="col-span-4 text-left">สินค้า</div>
          <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
          <div className="col-span-2 text-center">จำนวน</div>
          <div className="col-span-1 text-center">ราคารวม</div>
        </div>
        
        {items.map((item) => (
          <CartItemRow
            key={item._id}
            item={item}
            handleQuantityChange={onQuantityChange} 
            handleRemoveClick={onRemoveClick}      
          />
        ))}
      </div>
      <div className="flex items-center mb-8 p-5 bg-gray-50 border-t border-gray-200">
          <span className="text-gray-800">
            สินค้ารวม {totalQuantity} ชิ้น
          </span>
        </div>
      </div>
  );
};