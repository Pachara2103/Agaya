import { useState, useEffect } from 'react';
import showProductDetail from '../../hooks/showProductDetail';
import { getFinalPrice } from '../../libs/productService';

const StarRating = ({ rating, reviewCount }) => (
  <div class="flex items-center **:text-sm">
    <span class="text-yellow-400">{'★'.repeat(Math.floor(rating))}</span>
    <span class="text-gray-300">{'★'.repeat(5 - Math.floor(rating))}</span>
    {/* <span class="text-gray-500 ml-1">({reviewCount})</span> */}
  </div>
);

const PriceDisplay = ({ product, price }) => {
  return (
    <div class="flex items-center gap-3 my-2">
      {product.promotion.active && (
        <div>
          <span class="text-gray-400 line-through mr-2">{product.price}</span>
          <span class="font-semibold text-red-500">{price} {" ฿"}</span>
        </div>
      )}
      {!product.promotion.active && (
        <div><span class="font-semibold text-red-500">{product.price} {" ฿"}</span></div>
      )}
    </div>
  );

};

const ProductCard = ({ product }) => {
  const { onShow } = showProductDetail();
  const [finalPrice, setFinalPrice] = useState("");

    useEffect(() => {
      const getfinalPrice = async () => {
        const finalprice = await getFinalPrice(product._id);
        setFinalPrice(finalprice);
      }
      getfinalPrice();
    }, [])

  return (
    // for use group-hover 
    <div class="group relative" onClick={() => onShow(product)}>

      <div class="relative flex-shrink-0 aspect-square w-50 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.productName}
          class="h-[80%] w-[80%] object-contain object-center p-4 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
        />

        <span
          class="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 text-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          Add To Cart
        </span>

        {/* icon ♡ & 👁 opacity-0 group-hover:opacity-100  transition-opacity duration-300*/}
        <div class="absolute top-3 right-3 flex flex-col gap-2 ">
          <a class="bg-white rounded-full w-8 h-8 p-2 leading-none shadow-md text-[#000] text-[18px] hover:shadow-gray-400 cursor-pointer">♡</a>
          <a class="bg-white rounded-full w-8 h-8 p-2 leading-none shadow-md text-[#000] text-[18px] hover:shadow-gray-400 cursor-pointer">
            <img src="https://i.postimg.cc/sxdv675C/eye-1.png" alt="view" class="w-full" />
          </a>
        </div>

        {/* Tag ex -40%  */}
        {product.promotion.active && (
          <div class="absolute top-3 left-3 text-white text-xs px-3 py-1 rounded bg-[#DB4444]">
            -{product.promotion.promoDiscount}%
          </div>
        )}
      </div>

      <div class="mt-4">
        <h3 class="font-bold text-base text-[#000] max-w-55">{product.productName}</h3>
        <PriceDisplay product={product} price={finalPrice}/>
        <StarRating rating={product.rating} />
        {product.colors && (
          <div class="flex items-center gap-2 mt-2">
            {product.colors.map((color, index) => (
              <span key={index} class={`block w-5 h-5 rounded-full ${color}`}></span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductCard;