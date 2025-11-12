import { StoreGroup } from "./StoreGroup";

export const ProductTable = ({items}) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return <p className="p-4 text-center text-gray-500">ไม่มีสินค้าในรายการนี้</p>
  }

  const groupedByStore = items.reduce((acc, item) => {
    const storeName = item.storeName;
    if (!acc[storeName]) {
      acc[storeName] = [];
    }
    acc[storeName].push(item);
    return acc;
  }, {});

  const totalQuantity = items.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
  
  return (
    <div>
      <div className="overflow-hidden  space-y-5">
        <div className="md:grid grid-cols-10 gap-4 p-6 border-1 border-[#D9D9D9] ">
          <div className="col-span-4 text-left">สินค้า</div>
          <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
          <div className="col-span-2 text-center">จำนวน</div>
          <div className="col-span-1 text-center">ราคารวม</div>
        </div>
            
        <div className="space-y-0">
          {Object.entries(groupedByStore).map(([storeName, storeItems]) => (
            <StoreGroup
              key={storeName}
              storeName={storeName}
              items={storeItems}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center mb-8 p-5 bg-gray-50 border-t border-gray-200">
        <span className="text-gray-800">
          สินค้ารวม {totalQuantity} ชิ้น
        </span>
      </div>
    </div>
  );
};