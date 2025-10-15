import { CartItemRow } from "./CartItemRow";

export const StoreGroup = ({ storeName, items, onQuantityChange, onRemoveClick, isSelected, onToggleSelect }) => {
    console.log("hehe2", storeName, items)
    return (
        <div className="mb-5 border border-[#D9D9D9]">
            <div className="p-3 bg-[#F5F5F5] font-bold text-base text-left">
                {storeName}
            </div>
            <div className="space-y-0">
                {items.map((item) => (
                <CartItemRow
                    key={item._id}
                    item={item}
                    handleQuantityChange={onQuantityChange} 
                    handleRemoveClick={onRemoveClick}
                    isSelected={isSelected}
                    onToggleSelect= {onToggleSelect}      
                />
                ))}
            </div>
        </div>
    )
}