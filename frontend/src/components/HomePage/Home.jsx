import Promotion from "../Promotion/Promotion.jsx";
import Nav from "../NavBar/Nav.jsx";
import Footer from "../Footer/Footer.jsx";

import GridProductAndTitle from "../ProductPage/GridProduct.jsx";
import RowProductAndTitle from "../ProductPage/RowProduct.jsx";
import CategoryAndTitle from "../ProductPage/Category.jsx";
import Advertisement from "../ProductPage/Advertisement.jsx";

import products from "../ProductPage/exampleProduct.jsx";

function Home() {
  return (
    <div class="flex flex-col relative ">
      <Promotion />
      <Nav />

      <main>
        <div class="flex flex-col gap-10 px-30">
          <Advertisement />

          <RowProductAndTitle
            title="Today's"
            products={products}
            details="Flash Sales"
          />
          <CategoryAndTitle title="Categories" details="Browse By Category" />

          <RowProductAndTitle
            title="This Month"
            products={products}
            details="Best Selling Products"
          />

          <GridProductAndTitle
            products={products}
            details="Explore Our Products"
            title="Our Products"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
