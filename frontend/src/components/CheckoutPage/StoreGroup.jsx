import {ProductItemRow} from "./ProductItemRow";

export const StoreGroup = ({storeName, items}) => {
    if (!items || !Array.isArray(items)) {
        return null;
    }

    return (
        <div className="mb-5 border border-[#D9D9D9]">
            <div className="p-3 bg-[#F5F5F5] font-bold text-base text-left">
                {storeName}
            </div>
            <div className="space-y-0">
                {items.map((item) => (
                    <ProductItemRow
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}