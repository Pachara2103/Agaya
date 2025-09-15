import { ProductGrid } from "./GridProduct";
import ProductDetailPage from "./ProductDetailPage";

import "./.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ResultSearch = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { products } = location.state || { products: [] };

  const [productToShow, setProductToShow] = useState(null);

  const onShow = (p) => {
    if (p) {
      setProductToShow(p);
      console.log(" setProductToShow", p);
    }
    setShow(true);
  };
  const onBack = () => {
    setShow(false);
  };

  return (
    <div class="min-h-screen overflow-y-auto overflow-x-hidden">
      {!show && (
        <ProductGrid products={products} onShow={onShow} onBack={onBack} />
      )}
      {show && <ProductDetailPage onBack={onBack} product={productToShow} />}
    </div>
  );
};

export default ResultSearch;
