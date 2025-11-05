const DeleteProductModal = ({ confirmdelete, setConfirmDelete, handleDeleteProduct }) => {
  if (!confirmdelete) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg border z-10">
      <p className="text-sm text-gray-700 mb-4">   คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?      </p>
      <div className="flex justify-end space-x-2" >
        <button className="button-white flex-1" onClick={() => setConfirmDelete(false)}>ยกเลิก</button>
        <button className="button-border-red flex-1" onClick={handleDeleteProduct} > ยืนยัน </button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
