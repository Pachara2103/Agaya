import { ProductGrid } from "./GridProduct";
import "./.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../libs/productService.js";
import LoadingOverlay from '../LoadingOverlay';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getCategories } from '../../libs/categoryService.js';

const ResultSearch = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentpage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1)
  const [isloading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("")

  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const getcategories = async () => {
      const res = await getCategories();
      setAllCategories([{ categoryName: "" }, ...res.data])
    }
    getcategories();
    setIsLoading(false);

  }, [])

  const handlePageChange = (value) => {
    console.log(value)
    if (value <= 0 || value > totalpages) return;
    setCurrentPage(value);
  }

  useEffect(() => {
    setIsLoading(true);
    const handlePage = async () => {
      const res = await getProducts("", 1, 10, currentCategory);
      setTotalPages(res.pagination.totalPages);
      setProducts(res.data);
    };
    handlePage();
    setIsLoading(false);

  }, [currentCategory])

  useEffect(() => {
    if (location.state.key) setKeyword(location.state.key);
  }, [location.state.keyword])


  useEffect(() => {
    setIsLoading(true);
    const handleSearch = async () => {
      try {
        const res = await getProducts(keyword, currentpage, 10, "");
        setProducts(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();

  }, [keyword, currentpage]);

  const handlePagination = (totalpages, currentpage) => {
    const maxPages = 5;
    let startPage = currentpage;
    let endPage = currentpage + maxPages - 1;

    if (endPage > totalpages) {
      endPage = totalpages;
      startPage = totalpages - maxPages + 1;
    }

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalpages, maxPages);
    }

    return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);
  }

  return (
    <div class="min-h-screen h-auto overflow-x-hidden hide-scrollbar relative flex flex-col items-center">
      {isloading && (<LoadingOverlay isloading={isloading} />)}

      <button className="button-white absolute top-0 left-0 m-10 w-20" onClick={() => nav("/")} >   ย้อนกลับ </button>

      {!keyword && (
        <div className="flex flex-row justify-center items-center" >
          {allCategories.map((type, index) => (
            <div
              key={index}
              className={`w-35 h-10 flex items-center justify-center cursor-pointer text-gray-400 ${type.categoryName === currentCategory ? 'bg-[#B71F3B] text-white' : 'hover:bg-gray-300'}`}
              onClick={() => setCurrentCategory(type.categoryName)}>
              {!type.categoryName ? "All" : type.categoryName}
            </div>
          ))}

        </div>
      )}
      {products.length == 0 && (<span className="font-extrabold text-red-500 text-4xl items-center flex h-100"> ไม่พบสินค้าที่ค้นหา</span>)}


      <div className="w-5/6">  <ProductGrid products={products} />  </div>

      <div className="mb-10 " >
        <div className="flex flex-row justify-center items-center">
          <div className="w-15 h-10 flex items-center justify-center">
            <IoIosArrowBack size={30} className="hover:text-[#B71F3B] text-gray-400 cursor-pointer" onClick={() => handlePageChange(currentpage - 1)} />
          </div>

          {handlePagination(totalpages, currentpage).map((page) => (
            <div
              key={page}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer text-gray-400 ${page === currentpage ? 'bg-[#B71F3B] text-white' : 'hover:bg-gray-300'}`}
              onClick={() => handlePageChange(page)}>
              {page}
            </div>
          ))}

          <div className="w-15 h-10 flex items-center justify-center">
            <IoIosArrowForward size={30} className="hover:text-[#B71F3B] text-gray-400 cursor-pointer" onClick={() => handlePageChange(currentpage + 1)} />
          </div>

        </div>


      </div>

    </div>
  );
};

export default ResultSearch;
