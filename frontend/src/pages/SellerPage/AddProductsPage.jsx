import AddProductSidebar from "./AddProductSidebar";
import LoadingOverlay from '../../components/Common/LoadingOverlay';
import { useProductForm } from '../../hooks/useProductForm';
import ProductGeneralInfo from './ProductGeneralInfo';
import ProductSalesInfo from './ProductSalesInfo';
import SellerConfirmationModal from './SellerConfirmationModal';
import AlertSnackbar from '../../components/Common/AlertSnackbar';
import { useState } from 'react';

const AddProductsPage = ({ setPageSelected, product, isEdit }) => {
  const {
    states,
    setters,
    handlers,
  } = useProductForm({ product, isEdit, setPageSelected });

  const { name, category, description, price, stock, selectedFile, isloading, confirmdelete } = states;
  const { setConfirmDelete } = setters;
  const { submit, handleDeleteProduct: deleteProductFromHook } = handlers;
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleDelete = async () => {
    const { status, data } = await deleteProductFromHook();
    if (status === 200) {
      setSnackbar({ open: true, message: data.message || 'Product deleted successfully!', severity: 'success' });
      setPageSelected('สินค้าของฉัน');
    } else {
      setSnackbar({ open: true, message: data.message || 'Failed to delete product.', severity: 'error' });
    }
    setConfirmDelete(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen">
      <AlertSnackbar open={snackbar.open} onClose={handleSnackbarClose} message={snackbar.message} severity={snackbar.severity} />
      <div className="flex sm:flex-row flex-col space-x-8">
        <AddProductSidebar
          name={name}
          img={selectedFile}
          category={category}
          description={description}
          price={price}
          stock={stock}
        />

        <div className="sm:w-3/4 w-full relative">
          {isloading && (<LoadingOverlay isloading={isloading} />)}

          <div className="relative">
            {isEdit && (
              <button className="button-border-red w-20 absolute top-6 right-10" onClick={() => setConfirmDelete(true)} >ลบสินค้า</button>
            )}
            <SellerConfirmationModal
              open={confirmdelete}
              onCancel={() => setConfirmDelete(false)}
              onConfirm={handleDelete}
              title="ยืนยันการลบสินค้า"
              message="คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?"
            />
          </div>

          <ProductGeneralInfo states={states} setters={setters} handlers={handlers} isEdit={isEdit} product={product} />
          <ProductSalesInfo states={states} setters={setters} handlers={handlers} />

          {/* Action Buttons */}
          <div className="flex w-full sm:w-270  justify-center sm:justify-end space-x-4 mt-8">
            <button
              className="button-white w-20"
              onClick={() => setPageSelected("สินค้าของฉัน")}
            >
              ยกเลิก
            </button>
            <button
              className="button-border-green w-20"
              onClick={submit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsPage;