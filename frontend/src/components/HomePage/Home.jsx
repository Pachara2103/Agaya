import { getProducts, getPromotionProduct, updatePromotionStatus } from "../../libs/productService.js";
import { useEffect, useState } from "react";
import GridProductAndTitle from "../ProductPage/GridProduct.jsx";
import Advertisement from "../ProductPage/Advertisement.jsx";
import Service from "../ProductPage/Service.jsx";
import RowProductAndTitle from "../ProductPage/RowProduct.jsx";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../../libs/cookieService.js";

function Home() {
  const [showproducts, setShowProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [promotionproducts, setPromotionProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProducts();
      setShowProducts(res.data);
    };
    const recommendation = async () => {
      const productRecomendation = await getRecommendations();
      setRecommendations(productRecomendation)
    };
    const promotion = async () => {
      const promotionProduct = await getPromotionProduct();
      setPromotionProducts(promotionProduct);
    }
    const updatepromotionStatus = async () => {
      await updatePromotionStatus();
    }
    fetchProduct();
    recommendation();
    promotion();
    updatepromotionStatus();
  }, []);

  const seeAllProducts = () => {
    navigate("/result-search", { state: { products: showproducts } });
  };

  return (
    <div class="flex flex-col relative ">
      <main>
        <div class="flex flex-col gap-10 px-30">
          <Advertisement />

          {recommendations != [] && (<RowProductAndTitle
            title=" Recommendation"
            products={recommendations}
            details="เเนะนำสำหรับคุณ"
          />)}

          {promotionproducts != [] && (<RowProductAndTitle
            title=" Exclusive Products"
            products={promotionproducts}
            details="โปรโมชั่นพิเศษ"
          />)}

          <div className="h-210 overflow-hidden">
            <GridProductAndTitle
              products={showproducts}
              details="สินค้าของเรา"
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
