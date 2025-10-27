import { getProducts } from "../../libs/productService.js";
import { useEffect, useState } from "react";

import GridProductAndTitle from "../ProductPage/GridProduct.jsx";
import Advertisement from "../ProductPage/Advertisement.jsx";
import Service from "../ProductPage/Service.jsx";
import RowProductAndTitle from "../ProductPage/RowProduct.jsx";
import CategoryAndTitle from "../ProductPage/Category.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showproducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProducts();
      console.log(res.data);
      console.log(Array.isArray(res.data));
      setShowProducts(res.data);
    };
    fetchProduct();
  }, []);

  const seeAllProducts = () => {
    navigate("/result-search", { state: { products: showproducts } });
  };

  return (
    <div class="flex flex-col relative ">
      <main>
        <div class="flex flex-col gap-10 px-30">
          <Advertisement />

          <div className="h-210 overflow-hidden">
            <GridProductAndTitle
              products={showproducts}
              details="Explore Our Products"
              title="Our Products"
            />
          </div>

          <div className="w-full text-2xl mb-15 flex justify-center ">
            <button
              className="p-4 bg-[#B71F3B] text-white cursor-pointer hover:scale-105 hover:shadow-lg transition-transform ease-in-out duration-50"
              onClick={seeAllProducts}
            >
              ดูสินค้าทั้งหมด
            </button>
          </div>

          <div className="w-full flex justify-center ">
            <img src="https://i.postimg.cc/CLTyzzLn/Frame-600.png" alt="ads" />
          </div>

          <Service />
        </div>
      </main>
    </div>
  );
}

export default Home;
