import { ProductGrid } from "./GridProduct";

import "./.css";
import { useLocation, useNavigate } from "react-router-dom";

const ResultSearch = () => {
  const location = useLocation();
  const nav = useNavigate();
  const isSearchPage = location.pathname === "/result-search";

  const { products } = location.state || { products: [] };

  return (
    <div class="min-h-screen h-auto overflow-x-hidden hide-scrollbar relative">
      {isSearchPage && (
        <button
          className="button-white absolute top-0 left-0 m-10 w-20"
          onClick={() => (nav("/"))}
        >
          ย้อนกลับ
        </button>
      )}
      <ProductGrid 
      products={products} 
      />
    </div>
  );
};

export default ResultSearch;
