import { ProductGrid } from "./GridProduct";
import ProductDetailPage from "./ProductDetailPage";

import "./.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ResultSearch = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const isSearchPage = location.pathname === "/result-search";

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
  const backToHome = () => {
    window.location.href = "/";
  };

  return (
    <div class="min-h-screen h-auto overflow-x-hidden hide-scrollbar relative">
      {isSearchPage && (
        <button
          className="button-white absolute top-0 left-0 m-10 w-20"
          onClick={() => (window.location.href = "/")}
        >
          ย้อนกลับ
        </button>
      )}
      {!show && (
        <ProductGrid products={products} onShow={onShow} onBack={onBack} />
      )}
      {show && <ProductDetailPage onBack={onBack} product={productToShow} />}
    </div>
  );
};

export default ResultSearch;
