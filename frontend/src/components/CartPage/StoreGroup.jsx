import { CartItemRow } from "./CartItemRow";

export const StoreGroup = ({ storeName, items, onQuantityChange, onRemoveClick }) => {
    console.log("hehe2", storeName, items)
    return (
        <div>
            <div>
                { storeName }
            </div>
            <div>
                {items.map((item) => (
                <CartItemRow
                    key={item._id}
                    item={item}
                    handleQuantityChange={onQuantityChange} 
                    handleRemoveClick={onRemoveClick}      
                />
                ))}
            </div>
        </div>
    )
}