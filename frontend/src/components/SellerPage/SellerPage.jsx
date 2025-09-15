import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DashBoard from "./DashBoard";
import Sidebar from "./SideBar";
import MyProductsPage from "./MyProductsPage";
import AddProductsPage from "./AddProductsPage";

import { getMe } from "../../libs/authService";

import "./.css";

const icon = {
  dashboard: 0,
  สินค้าของฉัน: 1,
  เพิ่มสินค้าใหม่: 2,
  edit: 3,
};

function SellerPage() {
  const [pageSelected, setPageSelected] = useState("dashboard");
  const [editproduct, setEditProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    getMe().then(data => {
      if (data.success) {
        setUser(data.data);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const editProduct = (p) => {
    setEditProduct(p);
  };

  const displaySidebar = pageSelected !== "เพิ่มสินค้าใหม่" && pageSelected !== "edit";

  const userClick = () => {
    switch (icon[pageSelected]) {
      case 0:
        return <DashBoard />;
      case 1:
        return (
          <MyProductsPage
            setPageSelected={setPageSelected}
            setEditProduct={editProduct}
          />
        );
      case 2:
        return <AddProductsPage setPageSelected={setPageSelected} />;
      case 3:
        return (
          <AddProductsPage
            setPageSelected={setPageSelected}
            product={editproduct}
            isEdit={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen font-sans">
      
      <header className="flex justify-between items-center px-10 py-3 border-b bg-white shadow-sm w-full">
        <h1
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => setPageSelected("dashboard")}
        >
          Agaya <span className="font-normal text-gray-500">Seller Centre</span>
        </h1>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 border rounded-full p-1 pr-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={user?.profileImageUrl || "https://i.postimg.cc/br0yv892/user-1.png"}
              className="w-8 h-8 object-cover rounded-full"
              alt="Profile"
            />
            <span className="text-sm text-gray-700">{user?.username || "ชื่อร้านค้า"}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                กลับไปหน้าหลัก
              </a>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <Sidebar
          setPageSelected={setPageSelected}
          pageSelected={pageSelected}
          display={displaySidebar}
        />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {userClick()}
        </main>
      </div>
    </div>
  );
}

export default SellerPage;