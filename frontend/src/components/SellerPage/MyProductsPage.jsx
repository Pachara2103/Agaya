import { useEffect, useState } from "react";
import { getProductsByVendorId, getFinalPrice } from "../../libs/productService";
import "./.css";
import { FaPlus } from "react-icons/fa6";
import ProductRowItem from './ProductRowItem';


const MyProductsPage = ({ setPageSelected, setEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [finalpriceProducts, setFinalPriceProducts] = useState([])
  useEffect(() => {
    fetchMyproduct();
  }, []);

  useEffect(() => {
    const calculateFinalPrice = async () => {
      const pricePromises = products.map(item => getFinalPrice(item._id));
      const prices = await Promise.all(pricePromises);
      setFinalPriceProducts(prices)
    };
    calculateFinalPrice();

  }, [products]);

  const fetchMyproduct = async () => {
    const res = await getProductsByVendorId();
    setProducts(res.data);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow sm:overflow-auto w-100 sm:w-280">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">สินค้าของฉัน</h2>
        <button className="p-5 flex flex-row gap-2 items-center button-red " onClick={() => setPageSelected("เพิ่มสินค้าใหม่")}     >
          <FaPlus size={20} />
          เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="flex sm:flex-row sm:gap-0 gap-2 flex-col sm:items-center justify-center sm:justify-between space-x-4 mb-4 sm:pb-4 border-b">
        <input
          type="text"
          placeholder="ค้นหาด้วย ชื่อสินค้า IDของสินค้า"
          className="border border-[#878787] text-[#878787] flex-1 p-4 outline-none"
        />
        <input
          type="text"
          placeholder="ค้นหาด้วยหมวดหมู่สินค้า"
          className="border border-[#878787] text-[#878787] p-4 flex-1 outline-none "
        />

        <div class="flex-1 flex justify-center sm:justify-end gap-10 items-center">
          <button className="w-20 button-border-red py-4 ">ยืนยัน</button>
          <button className="button-white w-20 py-4">รีเซ็ต</button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        รายการสินค้า {products.length} รายการ
      </p>

      <div className="bg-[#EFEFEF] p-5 sm-hidden">
        <div className="grid grid-cols-13 gap-4 text-[#828282] ">
          <div className="col-span-4 ">สินค้า</div>
          <div className="col-span-1 text-center">ยอดขาย</div>
          <div className="col-span-2 text-center">ราคา</div>
          <div className="col-span-1 text-center">คลังสินค้า</div>
          <div className="col-span-3 text-center">โปรโมชั่น</div>
          <div className="col-span-2"></div>
        </div>
      </div>

      <ProductRowItem products={products} finalpriceProducts={finalpriceProducts} setEditProduct={setEditProduct} setPageSelected={setPageSelected} />


    </div>
  );
};

export default MyProductsPage;
