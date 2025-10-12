import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrCreateCartByUserId,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../libs/cartService";
import { getMe } from "../../libs/authService";

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

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 transition-opacity">
      <div className="bg-[#F5F5F5] p-8 max-w-md w-full text-center transform transition-all scale-100">
        <h2 className="text-2xl font-semibold mb-4">
          คุณต้องการลบสินค้าใช่หรือไม่
        </h2>
        <p className="text-black mb-8">
          หากคุณต้องการลบสินค้าออกจากตะกร้า
          <br />
          โปรดกดปุ่ม "ยืนยัน"
        </p>
        <div className="flex justify-center gap-4 bg-amber-50 mx-5">
          <button
            onClick={onCancel}
            className="flex-1 px-8 py-3 text-black bg-[#FF849B]/34 border-1 border-[#B71F3B] hover:bg-[#FF849B]/70 transition-colors cursor-pointer"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-8 py-3 text-green-800 bg-green-200 hover:bg-green-300 transition-colors border-1 border-[#009E3F] cursor-pointer"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Cart Component ---
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null); 

  const fetchCartData = async () => {
    setIsLoading(true);
    setError(null);
    let currentUserId = null;

    try {
      const meResponse = await getMe();
      currentUserId = meResponse.data?._id;

      if (!currentUserId) {
        // Handle case where user is not logged in
        throw new Error("User not authenticated.");
      }

      const userCart = await getOrCreateCartByUserId(currentUserId);
      const fetchedCartId = userCart._id;
      setCartId(fetchedCartId);

      const fetchedItems = await getCartItems(fetchedCartId);

      setCartItems(
        fetchedItems.map((item) => ({
          _id: item._id,
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productId.productName || "Product",
          price: item.productId.price,
          image: item.productId.image,
        }))
      );
    } catch (error) {
      console.error("Cart fetch error:", error);
      setError(error.message || "Failed to load cart.");
      setCartItems([]);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (addtoId, newQuantity) => {
    const quantity = Math.max(1, newQuantity);
    setCartItems(
      cartItems.map((item) =>
        item._id === addtoId ? { ...item, quantity } : item
      )
    );

    const itemToUpdate = cartItems.find((item) => item._id === addtoId);

    if (itemToUpdate) {
      try {
        await updateCartItemQuantity(addtoId, {
          productId: itemToUpdate.productId._id,
          cartId: cartId,
          quantity: quantity,
        });
      } catch (e) {
        console.error("Failed to update quantity on backend:", e);
        fetchCartData();
      }
    }
  };

  //remove
  const handleRemoveClick = (addtoId) => {
    setItemToDeleteId(addtoId);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (itemToDeleteId) {
      try {
        await deleteCartItem(itemToDeleteId);

        setCartItems(cartItems.filter((item) => item._id !== itemToDeleteId));
      } catch (e) {
        console.error("Failed to delete item from cart:", e);
      }
    }
    setIsModalOpen(false);
    setItemToDeleteId(null);
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDeleteId(null); 
  };

  //all price
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  // if (isLoading) {
  //   return (
  //     <div className="text-center p-20 text-lg">
  //       <p>Loading Cart Data...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white text-gray-800 p-4 sm:p-8 md:p-16">
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8">
          <span onClick={() => goToHome()} className="cursor-pointer">
            {" "}
            Home
          </span>
          <span className="text-gray-800"> / Cart</span>
        </div>

        {/* Cart Table */}
        <div className="overflow-hidden mb-8 space-y-5">
          <div className="md:grid grid-cols-10 gap-4 p-6 border-1 border-[#D9D9D9] ">
            <div className="col-span-4 text-left">สินค้า</div>
            <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
            <div className="col-span-2 text-center">จำนวน</div>
            <div className="col-span-1 text-center">ราคารวม</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center p-5 border-1 border-[#D9D9D9] text-center"
            >
              {/* Product */}
              <div className="col-span-1 md:col-span-4 flex items-center gap-4 text-left">
                <img
                  src={item.image?.[0] || 'placeholder.jpg'}
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
                      handleQuantityChange(
                        item._id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-12 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex flex-col items-center ml-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                    >
                      <ChevronUpIcon />
                    </button>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
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
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <button className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
            Return to shop
          </button>
          <button 
          onClick={fetchCartData} 
          className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
            Update cart
          </button>
        </div>

        {/* Coupon and Cart Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
          <div className="flex w-full md:w-[35vw] gap-4">
            <input
              type="text"
              placeholder="ใส่คูปองลดราคา"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-400 p-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
            />
            <button className="bg-[#48B3AF] hover:bg-[#48b3afa6] text-white px-8 py-3 rounded-md  transition-colors whitespace-nowrap cursor-pointer">
              กดใส่โค้ด
            </button>
          </div>

          <div className="border-1 border-black rounded-md p-6 w-full md:max-w-sm">
            <h2 className="text-xl font-medium mb-6">ยอดรวมในตะกร้าสินค้า</h2>
            <div className="space-y-6">
              <div className="flex justify-between border-b pb-2">
                <span>ยอดรวมสินค้า:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>ค่าจัดส่ง:</span>
                <span>
                  {shipping === 0 ? "ฟรี" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between ">
                <span>ยอดรวมสินค้า:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-[#48B3AF] hover:bg-[#48b3afa6] text-white mt-6 py-4 rounded-md transition-colors cursor-pointer">
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
