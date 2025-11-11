import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./nav.css"

function SearchBar() {
  const navigate = useNavigate()
  const [key, setKey] = useState("");

  const handleSearch = async () => {
    let keyword = !key?"All" : key;
    
    navigate(`/result-search`, { state: { keyword } });
  };

  return (
    <div className={`flex items-center h-full text-black justify-center text-[14px]`}>
      <input
        type="text"
        placeholder="ค้นหาสินค้าและร้านค้า"
        className="text-[#7d8184] px-[10px] py-[8px] w-full md:w-3/4 h-10 border-none outline-none bg-[#f5f5f5] rounded-sm"
        onChange={(e) => { setKey(e.target.value) }}
        onKeyDown={(e) => { if (e.key == "Enter") handleSearch() }}
      />
      <CiSearch size={30} onClick={handleSearch}  className="cursor-pointer"/>
    </div>
  );
}

export default SearchBar;
