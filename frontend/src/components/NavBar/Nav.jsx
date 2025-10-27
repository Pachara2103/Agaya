import "./nav.css";
import Signin from "../LoginPage/Signin.jsx";
import signup from "../LoginPage/Signup.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { getMe } from "../../libs/authService"; 
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
      <div className="header">
        <div className="header-left">
          <h2 className="text-[#000] text-[18px] cursor-pointer font-bold" onClick={() => {
            nav("/")
          }}>
            Agaya
          </h2>
        </div>

        <div className="header-right">
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
      </div>
    </nav>
  );
}
export default Nav;