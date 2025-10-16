export const ProductItemRow = ({item}) => {
    return (
        <div
            key={item._id}
            className="grid grid-cols-10 gap-4 items-center p-5 border-b border-gray-200 text-center"
        >
            <div className="col-span-4 flex items-center gap-4 text-left">
                <img
                    src={item.image?.[0] || "https://placehold.co/64x48/eee/ccc?text=Img"}
                    alt={item.productName}
                    className="w-16 h-12 object-contain-rounded"
                />
                <span>{item.productName}</span>  
            </div>

            <div className="col-span-2">${item.price}</div>

            <div className="col-span-2">x {item.quantity}</div>

            <div className="col-span-2 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};