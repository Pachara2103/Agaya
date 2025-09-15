import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="search-box medium">
      <input type="text" placeholder="ค้นหาสินค้าและร้านค้า" />
      <CiSearch size={30} />
    </div>
  );
}

export default SearchBar;