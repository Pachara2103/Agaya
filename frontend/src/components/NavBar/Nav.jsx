import "./nav.css";
import { useNavigate } from "react-router-dom";
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
      <div class="flex flex-row justify-between w-full h-15 box-border border-b border-[#7d8184]">

        <div className="w-50 md:w-80 flex justify-center items-center">
          <h2 className="text-[#000] text-[18px] cursor-pointer font-bold" onClick={() => { nav("/") }}>
            Agaya
          </h2>
        </div>
        <NavLinks user={user} />

        <SearchBar />


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