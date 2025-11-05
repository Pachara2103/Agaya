import AddProductSidebar from "./AddProductSidebar";
import LoadingOverlay from '../LoadingOverlay';
import { useProductForm } from '../../hooks/useProductForm';
import ProductGeneralInfo from './ProductGeneralInfo';
import ProductSalesInfo from './ProductSalesInfo';
import DeleteProductModal from './DeleteProductModal';

const AddProductsPage = ({ setPageSelected, product, isEdit }) => {
  const {
    states,
    setters,
    handlers,
  } = useProductForm({ product, isEdit, setPageSelected });

  const { name, category, description, price, stock, selectedFile, isloading, confirmdelete } = states;
  const { setConfirmDelete } = setters;
  const { submit, handleDeleteProduct } = handlers;

  return (
    <div className="min-h-screen">
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
            <DeleteProductModal
              confirmdelete={confirmdelete}
              setConfirmDelete={setConfirmDelete}
              handleDeleteProduct={handleDeleteProduct}
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