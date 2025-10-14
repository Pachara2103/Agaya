import React from "react";

const ChevronUpIcon = () => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5L5 1L1 5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CartItemRow = ({ item, handleQuantityChange, handleRemoveClick }) => {
  return (
    <div
      key={item._id}
      className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center p-5 text-center"
    >
      {/* Product */}
      <div className="col-span-1 md:col-span-4 flex items-center gap-4 text-left">
        <img
          src={item.image?.[0] || "placeholder.jpg"}
          alt={item.productName}
          className="w-16 h-12 object-contain"
        />
        <span>{item.productName}</span>
      </div>

      {/* Price */}
      <div className="col-span-1 md:col-span-2 ">${item.price}</div>

      {/* Quantity */}
      <div className="col-span-1 md:col-span-2 flex justify-center items-center">
        <div className="flex items-center border rounded-md p-2">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item._id, parseInt(e.target.value, 10))
            }
            className="w-12 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex flex-col items-center ml-2">
            <button
              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
              className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
            >
              <ChevronUpIcon />
            </button>
            <button
              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
            >
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Subtotal */}
      <div className="col-span-1 md:col-span-1">
        <span className="md:hidden font-medium">ราคารวม: </span>$
        {(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <div className="col-span-1 md:col-span-1 flex justify-center">
        <button
          onClick={() => handleRemoveClick(item._id)}
          className="bg-[#B71F3B] text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};
