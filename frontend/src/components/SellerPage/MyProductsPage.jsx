import { useEffect, useState } from "react";
import { getProductsByVendorId, getFinalPrice, deleteProduct, getProductSalesByVendor } from "../../libs/productService";
import "./.css";
import { FaPlus } from "react-icons/fa6";
import ProductRowItem from './ProductRowItem';
import SellerConfirmationModal from './SellerConfirmationModal';
import AlertSnackbar from '../AlertSnackbar';

const MyProductsPage = ({ setPageSelected, setEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [finalpriceProducts, setFinalPriceProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sales, setSales] = useState({});

  useEffect(() => {
    fetchMyproduct();
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await getProductSalesByVendor();
    if (res.success) {
      setSales(res.data);
    }
  };

  useEffect(() => {
    const calculateFinalPrice = async () => {
      if (products) {
        const pricePromises = products.map(item => getFinalPrice(item._id));
        const prices = await Promise.all(pricePromises);
        setFinalPriceProducts(prices)
      }
    };
    calculateFinalPrice();

  }, [products]);

  const fetchMyproduct = async (searchKeyword = '', searchCategory = '') => {
    const res = await getProductsByVendorId(searchKeyword, searchCategory);
    setProducts(res.data);
  };

  const handleSearch = () => {
    fetchMyproduct(keyword, category);
  };

  const handleReset = () => {
    setKeyword('');
    setCategory('');
    fetchMyproduct();
  };

  const handleDelete = (productId) => {
    setProductIdToDelete(productId);
    setConfirmDelete(true);
  };

  const handleDeleteProduct = async () => {
    if (productIdToDelete) {
      try {
        const { status, data } = await deleteProduct(productIdToDelete);
        if (status === 200) {
          setSnackbar({ open: true, message: data.message || 'Product deleted successfully!', severity: 'success' });
          fetchMyproduct(); // Refetch products
        } else {
          setSnackbar({ open: true, message: data.message || 'Failed to delete product.', severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'An error occurred while deleting the product.', severity: 'error' });
      } finally {
        setConfirmDelete(false);
        setProductIdToDelete(null);
        fetchMyproduct(); // Always refresh the list
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow sm:overflow-auto w-100 sm:w-280">
      <AlertSnackbar open={snackbar.open} onClose={handleSnackbarClose} message={snackbar.message} severity={snackbar.severity} />
      <SellerConfirmationModal 
        open={confirmDelete} 
        onCancel={() => setConfirmDelete(false)} 
        onConfirm={handleDeleteProduct} 
        title="ยืนยันการลบสินค้า" 
        message="คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?" 
      />
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="ค้นหาด้วยหมวดหมู่สินค้า"
          className="border border-[#878787] text-[#878787] p-4 flex-1 outline-none "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex-1 flex justify-center sm:justify-end gap-10 items-center">
          <button className="w-20 button-border-red py-4 " onClick={handleSearch}>ยืนยัน</button>
          <button className="button-white w-20 py-4" onClick={handleReset}>รีเซ็ต</button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        รายการสินค้า {products ? products.length : 0} รายการ
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

      <ProductRowItem products={products} finalpriceProducts={finalpriceProducts} sales={sales} setEditProduct={setEditProduct} setPageSelected={setPageSelected} handleDelete={handleDelete} />


    </div>
  );
};

export default MyProductsPage;
