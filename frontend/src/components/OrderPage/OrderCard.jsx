import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from 'axios';
import StatusTracking from "./StatusTracking";
import { ReturnStatusDisplay } from "./ReturnStatusDisplay";
import { ReturnTrackingIdForm } from "./ReturnTrackingIdForm";
import CompleteTracking from "../SellerPage/CompleteTracking";
import ToShip from '../SellerPage/ToShip';
import { getFinalPrice } from '../../libs/productService';
import { getTransactionByOrderId } from "../../libs/transactionService";
import { getOrder } from "../../libs/orderService";
import { getReviewByTransaction } from "../../libs/reviewService";
import ConfirmReturn from "../SellerPage/ConfirmReturn";
import ReviewForm from "./ReviewForm";

const OrderCard = ({
  isSellerPage,
  shopName,
  products,
  isOrderReceivePage,
  isOtherPage,
  orderId,
  onCancel,
  orderStatus,
  onReceive,
  onSubmitReturn,
  onSubmitTrackingId,
  latestStatusKey,
  page,
  storeAddress,
  selectFilter,
  shippingAddress,
  onUpdateStatus,
}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showstatus, setShowStatus] = useState(false);
  const [sellerpage, setSellerPage] = useState(false);
  const [completeFilter, setCompleteFilter] = useState(false);
  const [toshipFilter, setToshipFilter] = useState(false);
  const [finalpriceProducts, setFinalPriceProducts] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    if (products) {
      const calculateFinalPrice = async () => {
        const pricePromises = products.map(item => getFinalPrice(item.productId));
        const prices = await Promise.all(pricePromises);
        setFinalPriceProducts(prices)
      };
      calculateFinalPrice();
    }
  }, [products]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("ไม่พบ Token");
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:5000/api/v1/Agaya/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(userResponse.data);
      } catch(err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    setSellerPage(!!isSellerPage);

    if (selectFilter) {
      setCompleteFilter(selectFilter === "Completed");
      setToshipFilter(selectFilter === "ToShip");
    }
  }, [selectFilter]);

  useEffect(() => {
    const fetchTransactionId = async (orderId) => {
      try {
        if (!orderId) return;

        const transaction = await getTransactionByOrderId(orderId);
        if (!transaction) {
          console.error("ไม่พบ Transaction สำหรับ orderId:", orderId);
          return;
        }

        // Normalize the transaction response shape. Backend returns { success:true, data: transaction }
        const tx = transaction?.data ?? transaction;
        const txId = tx?._id ?? tx;
        // ensure we store a primitive id (string) so downstream callers are consistent
        setTransactionId(txId ? String(txId) : null);
      } catch(err) {
        console.error("เกิดข้อผิดพลาดในการดึง transaction:", err);
      }
    };
    fetchTransactionId(orderId);
  }, [orderId]);

  useEffect(() => {
    const fetchOrder = async (orderId) => {
      try {
        if (!orderId) return;

        const order = await getOrder(orderId);
        if (!order) {
          console.error("ไม่พบ Order สำหรับ orderId:", orderId);
          return;
        }

        setVendorId(order.data.vendorId || vendorId);
      } catch(err) {
        console.error("เกิดข้อผิดพลาดในการดึง order:", err);
      }
    };
    fetchOrder(orderId);
  }, [vendorId]);

  // check old review by transaction id
  // run when transactionId becomes available (not when existingReview changes)
  useEffect(() => {
    let mounted = true;

    const fetchOldReview = async () => {
      try {
        if (!transactionId) return;
        const oldReview = await getReviewByTransaction(transactionId);
        if (mounted) {
          setExistingReview(oldReview);
        }
      } catch (err) {
        // If there's no review, backend may return 404 or throw — treat as "no existing review"
        console.debug("ไม่พบรีวิวเก่าหรือเกิดข้อผิดพลาดในการดึงรีวิว:", err);
        if (mounted) setExistingReview(null);
      }
    };

    fetchOldReview();

    return () => {
      mounted = false;
    };
  }, [transactionId]);

  const showStatus = () => { setShowStatus(true); };
  const hideStatus = () => { setShowStatus(false); };

  // tmp module will use confirmation modal later
  const handleCancel = () => { if (window.confirm("really?")) onCancel(orderId); };

  const renderHeaderStatus = () => {
    if (page === 4) {
      return <ReturnStatusDisplay latestStatusKey={latestStatusKey} />;
    }
    return (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        cash on delivery
      </span>
    );
  };

  if (!currentUser) return <p>Loading user info . . .</p>

  return (
    <div className="bg-[#F8F8F8] shadow-sm border border-gray-200 min-w-70 ">
      {/* head*/}
      <div className="flex justify-between items-center p-4 px-10 border-b border-gray-200 bg-[#EFEFEF]">
        <h2 className="font-bold text-gray-700">{shopName}</h2>
        {renderHeaderStatus()}
      </div>

      {/* สินค้า */}
      <div className="p-4 px-10 relative">
        <div className="space-y-6">

          {products.map((product, index) => (
            <div key={product._id} className="flex md:flex-row flex-col gap-2 md:gap-0 items-center space-x-4 justify-between">

              {product && product.image && product.image.length > 0 && (
                <img
                  src={product.image[0]}
                  alt={product.name || "Product Image"}
                  className="w-20 h-20 object-contain rounded-md"
                />
              )}

              <div className="flex-grow flex flex-row gap-5 w-full max-w-110 justify-center items-center">
                <p className="text-gray-800 font-medium md:text-[14px] lg:text-[16px]">{product.name}</p>
                <p className="text-black  font-medium">x{product.quantity}</p>
              </div>

              <div className="w-full md:w-24 sm:text-center">
                <p className="text-gray-800 font-semibol d"> <span className="md-hidden">ราคารวม:</span> ${finalpriceProducts[index]}  </p>
              </div>

              <div className="w-80 text-right md-display">
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600" > รายละเอียดสินค้า </a>
              </div>

            </div>
          ))}
        </div>
        {(latestStatusKey === "COMPLETED" ||
          latestStatusKey === "DISPUTED" ||
          latestStatusKey === "RETURN_SHIPPED"
        ) && showReviewForm && (
          products.map(product => (
            <ReviewForm
              key={product.productId}
              productId={product.productId}
              vendorId={vendorId} //
              customerId={currentUser?.data?._id}
              transactionId={transactionId}
              existingReview={existingReview}
              userName={currentUser ? currentUser.data.username : "Loading . . ."}
              userImageUrl={currentUser ? currentUser.data.profileImageUrl : ""}
              onReviewSubmitted={() => setShowReviewForm(true)}
            />
          ))
        )}
      </div>

      {page === 4 && storeAddress && (
        <div className="p-4 px-10 pt-0 border-t border-gray-200 mt-4 bg-white">
          <h3 className="font-bold text-md mt-2 text-gray-800 mb-2">
            ที่อยู่สำหรับจัดส่งคืนสินค้า:
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            ร้าน: {shopName}
            <br />
            ที่อยู่: {storeAddress}
            <br />
            <span className="text-red-500 font-semibold mt-1 block">
              กรุณาจัดส่งสินค้าไปยังที่อยู่ด้านบนและแจ้งหมายเลขพัสดุกับผู้ดูแลระบบ
            </span>
          </p>
        </div>
      )}

      {page === 4 && latestStatusKey === "APPROVED" && (
        <ReturnTrackingIdForm
          orderId={orderId}
          onSubmitTrackingId={onSubmitTrackingId}
        />
      )}

      {isSellerPage && latestStatusKey === 'RETURN_SHIPPED' && (
        <ConfirmReturn orderId={orderId} onCompleteReturn={onUpdateStatus} />
      )}

      {!isOrderReceivePage && !isOtherPage && (
        <div className="w-full flex justify-center pb-3">
          <button
            onClick={handleCancel}
            className="w-50 py-5 bg-[#B71F3B] rounded-md font-medium hover:bg-[#951a31] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {isOrderReceivePage && !sellerpage && (
        <StatusTracking
          showstatus={showstatus}
          showStatus={showStatus}
          hideStatus={hideStatus}
          isOrderReceivePage={isOrderReceivePage}
          products={products}
          orderStatus={orderStatus}
          orderId={orderId}
          onReceive={onReceive}
          onSubmitReturn={onSubmitReturn}
          latestStatusKey={latestStatusKey}
        />
      )}

      {sellerpage && completeFilter && (
        <CompleteTracking
          showstatus={showstatus}
          showStatus={showStatus}
          hideStatus={hideStatus}
          completedFilter={completeFilter}
          orderStatus={orderStatus}
          latestStatusKey={latestStatusKey}
        />
      )}

      {sellerpage && toshipFilter && !completeFilter && (
        <ToShip
          showstatus={showstatus}
          showStatus={showStatus}
          hideStatus={hideStatus}
          shippingAddress={shippingAddress}
          orderId={orderId}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
};
export default OrderCard;
