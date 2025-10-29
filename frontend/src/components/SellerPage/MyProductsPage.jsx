import { useEffect, useState } from "react";
import { getProductsByVendorId, getFinalPrice } from "../../libs/productService";
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
  const formatDate = (date) => {
    const startdate = new Date(date);
    const thStartDate = new Date(startdate.getTime() + 7 * 60 * 60 * 1000);
    return (thStartDate.toISOString()).split('T')[0];
  }
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">สินค้าของฉัน</h2>
        <button
          className="p-5 flex flex-row items-center button-red "
          onClick={() => setPageSelected("เพิ่มสินค้าใหม่")}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="flex items-center justify-between space-x-4 mb-4 pb-4 border-b ">
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

        <div class="flex-1 flex justify-end gap-10 items-center">
          <button className="w-20 button-border-red py-4 ">ยืนยัน</button>
          <button className="button-white w-20 py-4">รีเซ็ต</button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        รายการสินค้า {products.length} รายการ
      </p>

      <div className="bg-[#EFEFEF] p-5  ">
        <div className="grid grid-cols-13 gap-4 text-[#828282] ">
          <div className="col-span-4 ">สินค้า</div>
          <div className="col-span-1 text-center">ยอดขาย</div>
          <div className="col-span-2 text-center">ราคา</div>
          <div className="col-span-1 text-center">คลังสินค้า</div>
          <div className="col-span-3 text-center">โปรโมชั่น</div>
          <div className="col-span-2"></div>
        </div>
      </div>

      <div className="border-l border-r border-b rounded-b-lg">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="grid grid-cols-13 gap-4 items-center p-4 border-b-1 border-[#CCCCCC] last:border-b-1 "
          >
            <div className="col-span-4 flex items-center">
              <img
                src={
                  product.image && product.image.length > 0
                    ? product.image[0]
                    : "https://via.placeholder.com/80"
                }
                alt={product.product_name}
                className="w-16 h-16 object-contain mr-4 border p-1"
              />
              <span className="font-semibold text-gray-800">
                {product.productName}
              </span>
            </div>

            <div className="col-span-1 text-center text-gray-700">N/A</div>
            <div className="col-span-2 text-center text-gray-700">
              {finalpriceProducts[index]}
            </div>
            <div className="col-span-1 text-center text-gray-700">
              {product.stockQuantity}
            </div>

            {/* promotion */}
            <div className="col-span-3 text-gray-500 text-center w-full"  >
              {product.promotion.active ? (
                <>
                  <p className="mb-2">ลด <span className="text-red-500 font-bold">{product.promotion.promoDiscount}%</span></p>
                  {formatDate(product.promotion.startDate)}{" "} ถึง {formatDate(product.promotion.endDate)}
                </>
              ) : 'ไม่มีโปรโมชัน'}
            </div>

            <div className="col-span-2 text-right">
              <button
                className="button-white w-20"
                onClick={() => {
                  setEditProduct(products[index]);
                  setPageSelected("edit");
                }}
              >
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProductsPage;
