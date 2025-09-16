import { useState, useEffect } from "react";

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HeartIcon = () => (
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

const ProductDetail = ({ product, onBack }) => {
  if (!product) {
    return <div>Loading product...</div>;
  }

  const [selectedImage, setSelectedImage] = useState(
    product.image && product.image.length > 0
      ? product.image[0]
      : "https://via.placeholder.com/500x500"
  );
  const [quantity, setQuantity] = useState(1);

  // อัปเดตรูปภาพที่เลือกเมื่อ prop product เปลี่ยนไป
  useEffect(() => {
    setSelectedImage(
      product.image && product.image.length > 0
        ? product.image[0]
        : "https://via.placeholder.com/500x500"
    );
  }, [product]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ฟังก์ชันสำหรับสร้างดาวตาม rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < rating} />
    ));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row-reverse gap-4">
          <div className="flex-grow flex items-center">
            <img
              src={selectedImage}
              alt={product.product_name}
              className="w-full max-h-120 object-contain rounded-lg bg-gray-100"
            />
          </div>

          <div className="flex md:flex-col gap-3 flex-shrink-0 relative">
            {product.image &&
              product.image.map((img, index) => (
                <a
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 p-1 rounded-md border-2 ${
                    selectedImage === img
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-100 rounded"
                  />
                </a>
              ))}

            <button
              class="absolute top-0 left-[-100px] button-white w-full"
              onClick={() => onBack()}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>

        {/* คอลัมน์ขวา */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.product_name}
          </h1>

          <div className="flex items-center my-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-gray-500 ml-3">(150 Reviews)</span>
            <span className="mx-4 text-gray-300">|</span>
            <span
              className={`font-semibold ${
                product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-3xl font-light text-gray-900">
            ฿{product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.product_description || "No description available."}
          </p>

          <hr className="my-8" />

          <div className="flex items-center ">
            {/* <div className="flex items-center border rounded-md ">
               <button
                onClick={decreaseQuantity}
                className="px-4 py-2 text-xl font-bold"
              >
                -
              </button>
              <span className="px-6 py-2 border-l border-r">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-4 py-2 text-xl font-bold text-red-500"
              >
                +
              </button> 
            </div> */}

            <button className="flex-1 ">
              Buy Now
            </button>

            {/* <a className="p-3 border rounded-md hover:bg-gray-100 bg-amber-600">
              <HeartIcon />
            </a> */}
          </div>

          <div className="mt-8 border rounded-md  flex flex-col gap-2">
            <div className="p-4 flex items-center border-black border-2 ">
              {/* Icon */}
              <p className="ml-4">
                <span className="font-semibold block text-black">Free Delivery</span>
                <span className="text-sm text-black">
                  Enter your postal code for Delivery Availability
                </span>
              </p>
            </div>

            <div className="p-4 flex items-center border-black border-2 ">
              {/* Icon */}
              <p className="ml-4">
                <span className="font-semibold block text-black">Return Delivery</span>
                <span className="text-sm text-gray-500">
                  Free 30 Days Delivery Returns. Details
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = ({ onBack, product }) => {
  //   const sampleProductData = {
  //     _id: "68c6f9136b57f2998888277b",
  //     product_name: "Havic HV G-92 Gamepad",
  //     stock_quantity: 60,
  //     price: 192.0,
  //     rating: 4,
  //     vid: "68c6f7146b57f29988882766",
  //     type: "Gaming",
  //     product_description:
  //       "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",
  //     image: [
  //       "https://i.imgur.com/As1V24s.png",
  //       "https://i.imgur.com/mp35s3G.png",
  //       "https://i.imgur.com/5L85KkC.png",
  //       "https://i.imgur.com/83NfQIm.png",
  //       "https://i.imgur.com/2TkFv4k.png",
  //     ],
  //     promotion: { active: false },
  //     createdAt: "2025-09-14T17:19:15.602Z",
  //     updatedAt: "2025-09-14T17:19:15.602Z",
  //     __v: 0,
  //   };

  return (
    <div className="font-sans">
      <ProductDetail product={product} onBack={onBack} />
    </div>
  );
};

export default ProductDetailPage;
