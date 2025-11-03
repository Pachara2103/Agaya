import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./nav.css"

function SearchBar() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    navigate(`/result-search`, { state: { keyword } });
    console.log('click')
  };

  return (
    <div class={`flex items-center h-full text-black justify-center text-[14px]`}>
      <input
        type="text"
        placeholder="ค้นหาสินค้าและร้านค้า"
        class="text-[#7d8184] px-[10px] py-[8px] w-full md:w-3/4 h-10 border-none outline-none bg-[#f5f5f5] rounded-sm"
        onChange={(e) => { setKeyword(e.target.value) }}
        onKeyDown={(e) => { if (e.key == "Enter") handleSearch() }}
      />
      <CiSearch size={30} onClick={handleSearch}  className="cursor-pointer"/>
    </div>
  );
}

export default SearchBar;
