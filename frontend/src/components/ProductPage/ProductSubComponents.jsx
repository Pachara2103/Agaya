import { useState, useEffect } from 'react';
import { getFinalPrice } from '../../libs/productService';

export const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const HeartIcon = () => (
  <svg
    className="w-6 h-6 text-gray-700"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
    ></path>
  </svg>
);

export const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <StarIcon key={i} filled={i < rating} />
  ));
};

export const ProductImageGallery = ({ product, selectedImage, setSelectedImage, onBack }) => (
  <div className="flex flex-col md:flex-row-reverse gap-6 relative">

    <div className="flex-grow flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
      <img
        src={selectedImage}
        alt={product.productName}
        className="w-full max-h-[500px] object-contain rounded-lg"
      />
    </div>

    {/* Thumbnails */}
    <div className="flex md:flex-col gap-3 flex-shrink-0 justify-center md:justify-start overflow-x-auto md:overflow-hidden">
      {product.image?.map((img, index) => (
        <a
          key={index}
          onClick={() => setSelectedImage(img)}
          className={`w-20 h-20 p-1 flex-shrink-0 rounded-md border-2 cursor-pointer transition duration-200 ${selectedImage === img ? "border-red-500 shadow-lg" : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <img
            src={img}
            alt={`thumbnail ${index + 1}`}
            className="w-full h-full object-contain bg-white rounded"
          />
        </a>
      ))}
    </div>
  </div>
);

export const ProductDetailsPanel = ({ product, quantity, increaseQuantity, decreaseQuantity, onAddToCart, onBuyNow }) => {
  const [finalPrice, setFinalPrice] = useState("");
  useEffect(() => {
    const getfinalPrice = async () => {
      const finalprice = await getFinalPrice(product._id);
      setFinalPrice(finalprice);
    }
    getfinalPrice();
  }, [])
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">
        {product.productName}
      </h1>

      <div className="flex items-center my-4">
        <div className="flex">{renderStars(product.rating)}</div>
        <span className="text-gray-500 ml-3 text-sm">(150 Reviews)</span>
        <span className="mx-4 text-gray-300">|</span>
        <span
          className={`font-semibold text-sm ${product.stockQuantity > 0 ? "text-green-600" : "text-red-600"
            }`}
        >
          {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : "Out of Stock"}
        </span>
      </div>

      {product.promotion.active && (
        <div className="mt-2 mb-6 text-2xl sm:text-4xl ">
          <span class="text-gray-400 line-through mr-2">{product.price}</span>
          <span class="font-bold text-red-500 ">{finalPrice} {" ฿"}</span>
        </div>
      )}
      {!product.promotion.active && (
        <div className="mt-2 mb-6 text-2xl sm:text-4xl">
          <span class="font-bold text-gray-900 ">{product.price} {" ฿"}</span>
        </div>
      )}


      <p className="text-gray-600 leading-relaxed border-b pb-6 mb-6">
        {product.productDescription || "No description available."}
      </p>

      <div className="flex items-center gap-4 mb-8">

        <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
          <button
            onClick={decreaseQuantity}
            className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            -
          </button>
          <span className="px-6 py-2 font-medium text-lg text-gray-900">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={onAddToCart}
          className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-black transition shadow-md cursor-pointer"
        >
          Add To Cart
        </button>

        {/* <button 
          onClick={onBuyNow}
          className="px-8 py-3 bg-[#48B3AF] text-white font-semibold cursor-pointer rounded-md hover:bg-[#48B3AF]/70 transition shadow-md"
      >
          Buy Now
      </button> */}

        {/* <a className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer ml-2">
          <HeartIcon />
      </a> */}
      </div>

      <div className="border border-gray-300 rounded-lg divide-y divide-gray-300">

        <div className="p-5 flex items-start gap-4">
          <span className="text-2xl text-gray-700"></span>
          {/* <MdOutlineLocalShipping /> */}
          <div>
            <span className="font-semibold block text-lg text-black">Free Delivery</span>
            <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
          </div>
        </div>


        <div className="p-5 flex items-start gap-4">
          <span className="text-2xl text-gray-700"></span>
          <div>
            <span className="font-semibold block text-lg text-black">Return Delivery</span>
            <p className="text-sm text-gray-500">
              Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};