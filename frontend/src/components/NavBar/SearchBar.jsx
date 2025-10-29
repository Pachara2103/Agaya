import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../libs/productService.js";
import { useEffect, useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    navigate(`/result-search`, {state:{ keyword } } );
  };

  return (
    <div className="search-box medium">
      <input
        type="text"
        placeholder="ค้นหาสินค้าและร้านค้า"
        onChange={(e) => { setKeyword(e.target.value) }}
        onKeyDown={(e) => { if (e.key == "Enter") handleSearch() }}
      />
      <CiSearch size={30} onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
