import React, { useState, useEffect } from 'react';
import { getReviewsByVendor, replyToReview } from '../../services/reviewService.js';
import { ReviewRow } from '../SellerPage/subcomponents/ReviewRow.jsx';
import { FilterStarIcon } from './subcomponents/CommonIcon.jsx';

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviewsByVendor(page, 5, ratingFilter);
      setReviews(data?.reviews || []);
      setPagination(data?.pagination || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, ratingFilter]);

  const handleReplySubmit = async (id, content) => {
    await replyToReview(id, content);
    fetchReviews(); 
  };

  // Pagination Controls
  const PaginationControls = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    return (
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ${
            page === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#48B3AF] text-white hover:bg-[#3b8f8c]'
          }`}
        >
          ก่อนหน้า
        </button>
        <span className="text-gray-700 text-sm">
          หน้า {pagination.currentPage || page} จาก {pagination.totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pagination.totalPages}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ${
            page === pagination.totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#48B3AF] text-white hover:bg-[#3b8f8c]'
          }`}
        >
          ถัดไป
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">จัดการรีวิวสินค้า</h1>

      <div className="grid grid-cols-6 gap-3 mb-4">
        {['All', 5, 4, 3, 2, 1].map((v) => {
          const isActive = ratingFilter === (v === 'All' ? null : v);
          return (
            <button
              key={v}
              onClick={() => {
                setRatingFilter(v === 'All' ? null : v);
                setPage(1); 
              }}
              className={`py-2 px-3 rounded-md border text-center transition-all duration-150 ${
                isActive
                  ? 'bg-[#B71F3B] text-white border-[#B71F3B]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              {v === 'All' ? (
                <span className="font-medium text-sm">ทั้งหมด</span>
              ) : (
                <div className="flex justify-center items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FilterStarIcon key={i} filled={i < v} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">สินค้า</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-600">Rating</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-600">ดูรายละเอียดรีวิว</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-600">ดูรายละเอียดสินค้า</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-8">
                  กำลังโหลดรีวิว...
                </td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-8">
                  ไม่พบรีวิว
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <ReviewRow key={review._id} review={review} onReplySubmit={handleReplySubmit} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls />
    </div>
  );
}