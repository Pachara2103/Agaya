import { StoreGroup } from "./StoreGroup";

export const CartTable = ({ groupedItems, onQuantityChange, onRemoveClick, isSelected, onToggleSelect }) => {
  const storeNames = Object.keys(groupedItems);
  // console.log("Store name:", storeNames)
  return (
    <div className="overflow-hidden mb-8 space-y-5">
      <div className="md:grid grid-cols-11 gap-4 p-6 border-1 border-[#D9D9D9] ">
        {/* <div className="col-span-1 text-center"></div> */}
        <div className="col-span-4 text-left">สินค้า</div>
        <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
        <div className="col-span-2 text-center">จำนวน</div>
        <div className="col-span-1 text-center">ราคารวม</div>
      </div>
      
      {storeNames.map((storeName) => (
        <StoreGroup
          key={storeName}
          storeName={storeName}
          items={groupedItems[storeName]} 
          onQuantityChange={onQuantityChange} 
          onRemoveClick={onRemoveClick}
          isSelected={isSelected}
          onToggleSelect= {onToggleSelect}
        />
      ))}
    </div>
  );
};