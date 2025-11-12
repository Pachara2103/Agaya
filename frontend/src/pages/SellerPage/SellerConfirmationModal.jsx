const SellerConfirmationModal = ({ open, onConfirm, onCancel, title, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl text-gray-900 font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-8">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="button-white flex-1"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="button-border-red flex-1"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerConfirmationModal;