import { useState } from "react";
import StatusTracking from "./StatusTracking";
import { ReturnStatusDisplay } from "./ReturnStatusDisplay";

const OrderCard = ({ shopName, products, isOrderReceivePage, isOtherPage, orderId, onCancel, orderStatus, onReceive, onSubmitReturn, latestStatusKey, page}) => {
  const [showstatus, setShowStatus] = useState(false);

  const showStatus = () => {
    setShowStatus(true);
  };
  const hideStatus = () => {
    setShowStatus(false);
  };
  // tmp module will use confirmation modal later
  const handleCancel = () => {
      if (window.confirm("really?")) {
          onCancel(orderId);
      }
  };

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

  return (
    <div className="bg-[#F8F8F8] shadow-sm border border-gray-200">
      {/* head*/}
      <div className="flex justify-between items-center p-4 px-10 border-b border-gray-200 bg-[#EFEFEF]">
        <h2 className="font-bold text-gray-700">{shopName}</h2>
        {renderHeaderStatus()}
      </div>

      {/* สินค้า */}
      <div className="p-4 px-10">
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product._id} className="flex items-center space-x-4">
              {
                product &&
                product.image &&
                product.image.length > 0 &&
                (
                  <img 
                    src={product.image[0]} 
                    alt={product.name || 'Product Image'} 
                    className="w-20 h-20 object-contain rounded-md"
                  />
                )
              }
              <div className="flex-grow flex flex-row gap-5">
                <p className="text-gray-800 font-medium">
                  {product.name}
                </p>
                <p className="text-black  font-medium">
                  x{product.quantity}
                </p>
              </div>
              <div className="w-24 text-right">
                <p className="text-gray-800 font-semibold">
                  ${product.totalPrice.toLocaleString()}
                </p>
              </div>
              <div className="w-32 text-right">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  รายละเอียดสินค้า
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(!isOrderReceivePage&&!isOtherPage) && (
        <div className="w-full flex justify-center pb-3">
          <button
            onClick={handleCancel}
            className="w-50 py-5 bg-[#B71F3B] rounded-md font-medium hover:bg-[#951a31] cursor-pointer">
            Cancel
          </button>
        </div>
      )}

      {isOrderReceivePage && (
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
        />
      )}
    </div>
  );
};
export default OrderCard;
