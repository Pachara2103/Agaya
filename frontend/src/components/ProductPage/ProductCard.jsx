const StarRating = ({ rating, reviewCount }) => (
  <div class="flex items-center **:text-sm">
    <span class="text-yellow-400">{'★'.repeat(Math.floor(rating))}</span>
    <span class="text-gray-300">{'★'.repeat(5 - Math.floor(rating))}</span>
    <span class="text-gray-500 ml-1">({reviewCount})</span>
  </div>
);

const PriceDisplay = ({ price, originalPrice }) => (
  <div class="flex items-center gap-3 my-2">
    <span class="font-semibold text-red-500">${price}</span>
    {originalPrice && (
      <span class="text-gray-400 line-through">${originalPrice}</span>
    )}
  </div>
);

const ProductCard = ({ product }) => {
  return (
    // for use group-hover 
    <div class="group relative">
      {/* --- img and btn--- */}
      <div class="relative flex-shrink-0 aspect-square w-50 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          class="h-[80%] w-[80%] object-contain object-center p-4 transition-transform duration-300 group-hover:scale-110"
        />

        {/* ปุ่ม Add to Cart  */}
        <button
          class="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 text-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add To Cart
        </button>

        {/* icon ♡ & 👁  */}
        <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="bg-white rounded-full p-2 leading-none shadow-md">♡</button>
          <button class="bg-white rounded-full p-2 leading-none shadow-md">👁</button>
        </div>

        {/* Tag ex -40%  */}
        {product.discountPercentage && (
          <div class="absolute top-3 left-3 text-white text-xs px-3 py-1 rounded bg-[#DB4444]">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      <div class="mt-4">
        <h3 class="font-bold text-base text-[#000]">{product.name}</h3>
        <PriceDisplay price={product.discountedPrice} originalPrice={product.originalPrice} />
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
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