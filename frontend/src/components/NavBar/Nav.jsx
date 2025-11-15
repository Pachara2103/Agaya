import "./nav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Nav() {
  const nav = useNavigate();
  const { user, logout, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { groupedCartItems } = useCart();
  const numberOfStoresInCart = Object.keys(groupedCartItems).length;
  const location = useLocation();
  const path = location.pathname;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const canSearch = (path === '/result-search' && windowWidth < 640);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // Use logout from AuthContext
    setIsDropdownOpen(false);
    nav("/signin");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav>
      <div className="flex flex-row justify-between w-full h-15 box-border border-b border-[#7d8184]">

        <div className="w-full justify-start px-5 sm:px-0 md:w-80 flex sm:justify-center items-center relative">
          <h2 className="text-[#000] text-[18px] cursor-pointer font-bold " onClick={() => { nav("/") }}>
            Agaya
          </h2>
          <div className="w-screen px-30 absolute"> {canSearch && (< SearchBar />)}</div>

        </div>
        <NavLinks user={user} handleLogout={handleLogout} />
        <div className="sm-hidden">  <SearchBar /> </div>

        <div ref={dropdownRef}>
          <NavIcons
            user={user}
            handleLogout={handleLogout}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            onClose={closeDropdown}
            numberOfStoresInCart={numberOfStoresInCart}
          />
        </div>
      </div>
    </nav>
  );
}
export default Nav;