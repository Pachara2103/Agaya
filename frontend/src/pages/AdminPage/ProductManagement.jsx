import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";

const ProductCard = ({ product, onDetail, onDelete }) => {
  return (
    <div className="flex w-full bg-white border border-gray-200 p-4 shadow-[0_0_1px_1px_rgba(221,221,221,0.7)] flex-shrink-0">
      <div className="flex-1 flex flex-col gap-1 justify-center">
        <h3 className="font-bold text-lg text-black">{product.name}</h3>
        <p className="text-sm text-black">ราคา: {product.price} บาท</p>
        <p className="text-sm text-black mt-1">สินค้าคงเหลือ: {product.stock > 0 ? product.stock : 0} ชิ้น</p>
      </div>
      <div className="flex-1 flex gap-2 items-center justify-end">
        <button 
          onClick={() => onDetail(product._id)}
          className="flex h-10 w-24 bg-[#3b82f6] text-white items-center justify-center cursor-pointer"
        >
          รายละเอียด
        </button>
        <button 
          onClick={() => onDelete(product._id, product.name)}
          className="flex h-10 w-24 !bg-[#B71F3B] text-white items-center justify-center cursor-pointer"
        >
          ลบ
        </button>
      </div>
    </div>
  );
};

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(); 
      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message || "Cannot fetch products");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDetail = (id) => {
    alert(`ดูรายละเอียด Product ID: ${id}`);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "${name}" ?`)) {
      try {
        await deleteProduct(id); 
        alert(`ลบสินค้า "${name}" สำเร็จ`);
        setProducts(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        alert("ลบสินค้าไม่สำเร็จ: " + err.message);
      }
    }
  };

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Product Management
      </div>
      <img
            className="w-full h-[1px] top-[115px] left-[51px] px-[63px]"
            alt="Line"
            src = "https://i.postimg.cc/ZKYXghDG/black-1.png"
          />
      <div className="flex h-130 bg-white justify-center">
        <div className="flex-1 my-6 mx-12 bg-white p-1 text-black">
          <div className="flex flex-col gap-2 mt-6 overflow-y-auto h-100">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onDetail={handleDetail}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-gray-500 mt-4">ไม่พบข้อมูลสินค้า</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagement;