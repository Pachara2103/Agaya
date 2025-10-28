import { getFinalPrice } from '../../libs/productService';
import { useEffect, useState } from "react";


export const ProductItemRow = ({ item }) => {
    const [finalPrice, setFinalPrice] = useState("");

    useEffect(() => {
        const getfinalPrice = async () => {
            const finalprice = await getFinalPrice(item.productId._id);
            setFinalPrice(finalprice);
        }
        getfinalPrice();
    }, [])

    return (
        <div
            key={item._id}
            className="grid grid-cols-10 gap-4 items-center p-5 border-b border-gray-200 text-center"
        >
            <div className="col-span-4 flex items-center gap-4 text-left">
                <img
                    src={item.image?.[0] || "https://placehold.co/64x48/eee/ccc?text=Img"}
                    alt={item.productName}
                    className="w-16 h-12 object-contain"
                />
                <span>{item.productName}</span>
            </div>

            <div className="col-span-2">${finalPrice}</div>

            <div className="col-span-2">x {item.quantity}</div>

            <div className="col-span-1 text-center font-semibold">
                ${(finalPrice * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};