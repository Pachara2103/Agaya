import { ProductGrid } from "./GridProduct";
import "./.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResultSearch = () => {
  const location = useLocation();
  const nav = useNavigate();
  const products = location.state.products || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div class="min-h-screen h-auto overflow-x-hidden hide-scrollbar relative  flex justify-center">
      <button
        className="button-white absolute top-0 left-0 m-10 w-20"
        onClick={() => nav("/")}
      >
        ย้อนกลับ
      </button>

      <div className="w-5/6 ">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ResultSearch;
