import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { renderStars, StarIcon } from './CommonIcon.jsx';

export const ReviewRow = ({ review, onReplySubmit }) => {
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);

  const product = review.productId;
  const user = review.customerId;
  const name = review.transactionId?.orderId?.shippingAddress?.name || 'Anonymous';
  const comment = review.reviewContent || review.comment || '';
  const reviewImages = review.image || [];

  const handleSend = async () => {
    if (!replyText.trim()) return;
    setLoading(true);
    try {
      await onReplySubmit(review._id, replyText);
      setReplyText('');
    } catch (err)
 {
      console.error(err);
      alert('ส่งคำตอบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="bg-white hover:bg-gray-50 border-b">
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src={product?.image?.[0] || 'https://placehold.co/100x100/eee/ccc?text=No+Image'}
              alt={product?.productName}
              className="w-14 h-14 rounded-md object-cover border"
            />
            <span className="font-medium text-gray-800">{product?.productName || 'ไม่ทราบชื่อสินค้า'}</span>
          </div>
        </td>
        <td className="px-5 py-4 text-center">{renderStars(review.rating)}</td>
        <td className="px-5 py-4 text-center">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 hover:underline text-sm"
          >
            {open ? 'ซ่อนรีวิว' : 'ดูรายละเอียดรีวิว'}
          </button>
        </td>
        <td className="px-5 py-4 text-center">
            <Link
                to={`/productdetail/${product?._id}`}
                className="text-[#48B3AF] hover:underline text-sm"
            >
                ดูรายละเอียดสินค้า
            </Link>
        </td>
      </tr>

      {open && (
        <tr className="border-b">
          <td colSpan={4} className="px-6 py-5 bg-[#F8F8F8]">
            
            {/* Customer Plane */}
            <div className="bg-[#EBEBEB] p-4 rounded-lg">
              <div className="flex items-start gap-3 mb-2">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                ) : (
                  <FaUserCircle className="w-9 h-9 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-sm text-gray-800">{name}</p>
                  <div className="flex">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < review.rating} />)}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2 pl-12">{comment}</p>
              {reviewImages.length > 0 && (
                <div className="flex gap-2 pl-12 overflow-x-auto mb-2">
                  {reviewImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="review"
                      className="w-16 h-16 rounded-md object-cover border cursor-pointer"
                      onClick={() => window.open(img, '_blank')}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Reply Section */}
            {review.vendorResponse ? (
              <div className="bg-[#DCDCDC] border-l-4 border-gray-400 p-3 mt-3 rounded-md text-sm italic text-gray-700">
                {review.vendorResponse}
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-3 p-4 rounded-lg bg-[#DCDCDC]">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="ตอบกลับข้อความตรงนี้"
                  className="flex-1 bg-white text-black text-sm px-3 py-3 h-[50px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48B3AF]"
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="min-w-[100px] h-[50px] px-5 bg-[#48B3AF] text-white text-sm font-medium rounded-md hover:bg-[#3b8f8c] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'กำลังส่ง...' : 'Reply'}
                </button>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};