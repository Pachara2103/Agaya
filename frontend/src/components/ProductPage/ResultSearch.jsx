import { ProductGrid } from "./GridProduct";

import "./.css";
import { useLocation, useNavigate } from "react-router-dom";

const ResultSearch = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const isSearchPage = location.pathname === "/result-search";

  const { products } = location.state || { products: [] };

  const onShow = (product) => {
    if (product && product._id) {
      navigate(`/productdetail/${product._id}`, { state: { product: product } });
    } else {
        console.error("Product ID is missing, cannot navigate to detail page.");
    }
  };
  const backToHome = () => {
    window.location.href = "/";
  };

  return (
    <div class="min-h-screen h-auto overflow-x-hidden hide-scrollbar relative">
      {isSearchPage && (
        <button
          className="button-white absolute top-0 left-0 m-10 w-20"
          onClick={() => (backToHome())}
        >
          ย้อนกลับ
        </button>
      )}
      <ProductGrid products={products} onShow={onShow} />
    </div>
  );
};

export default ResultSearch;
