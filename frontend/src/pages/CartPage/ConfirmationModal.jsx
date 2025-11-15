export const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs transition-opacity">
      <div className="bg-white p-8 max-w-md w-full border-1 border-black text-center transform transition-all scale-100">
        <h2 className="text-2xl font-semibold mb-4">
          คุณต้องการลบสินค้าใช่หรือไม่
        </h2>
        <p className="text-black mb-8">
          หากคุณต้องการลบสินค้าออกจากตะกร้า
          <br />
          โปรดกดปุ่ม "ยืนยัน"
        </p>
        <div className="flex justify-center gap-4 mx-5">
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