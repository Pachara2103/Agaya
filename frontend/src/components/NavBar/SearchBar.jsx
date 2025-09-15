import { CiSearch } from "react-icons/ci";
import { products, bestSelling } from "../ProductPage/exampleProduct.jsx";
import { useNavigate } from "react-router-dom";

function SearchBar() {

  const navigate = useNavigate();
  const search = () => {
    navigate("/result-search", { state: { products } });
  };

  return (
    <div className="search-box medium">
      <input type="text" placeholder="ค้นหาสินค้าและร้านค้า" />
      <CiSearch
        size={30}
        onClick={() => search()}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            search();
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
