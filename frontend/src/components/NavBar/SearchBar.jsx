import { CiSearch } from "react-icons/ci";
import { products, bestSelling } from "../ProductPage/exampleProduct.jsx";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../libs/productService.js";
import { useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const search = async (k) => {
    let res;
    if (k) {
      res = await getProducts(k);
    } else {
      res = await getProducts();
    }
    const products = await res.data;

    navigate("/result-search", { state: { products } });
  };

  return (
    <div className="search-box medium">
      <input
        type="text"
        placeholder="ค้นหาสินค้าและร้านค้า"
        onChange={(e)=>{
          setKeyword(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            search(keyword);
          }
        }}
      />
      <CiSearch size={30} onClick={() => search(keyword)} />
    </div>
  );
}

export default SearchBar;
