import GridProductAndTitle from "../ProductPage/GridProduct.jsx";
import RowProductAndTitle from "../ProductPage/RowProduct.jsx";
import CategoryAndTitle from "../ProductPage/Category.jsx";
import Advertisement from "../ProductPage/Advertisement.jsx";
import Service from "../ProductPage/Service.jsx";

import { products, bestSelling } from "../ProductPage/exampleProduct.jsx";

function Home() {
  return (
    <div class="flex flex-col relative ">
  

      <main>
        <div class="flex flex-col gap-10 px-30">
          <Advertisement />
          <div class="">

          <RowProductAndTitle
            title="Today's"
            products={products}
            details="Flash Sales"
          />
          <CategoryAndTitle title="Categories" details="Browse By Category" />

          <RowProductAndTitle
            title="This Month"
            products={bestSelling}
            details="Best Selling Products"
          />

          <img
            src="https://i.postimg.cc/CLTyzzLn/Frame-600.png"
            alt="ads"
            class="y-2"
          />

          <GridProductAndTitle
            products={products}
            details="Explore Our Products"
            title="Our Products"
          />

          <Service />
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default Home;
