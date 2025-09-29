import "./nav.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { getMe } from "../../libs/authService"; 

import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Nav() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getMe().then(data => {
        if (data.success) {
          setUser(data.data);
        }
      });
    }
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

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsDropdownOpen(false);
    nav("/signin");
    window.location.reload();
  };
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav>
      <div className="header">
        <div className="header-left">
          <h2 className="text-[#000] text-[18px] cursor-pointer font-bold" onClick={() => nav("/")}>
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
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Nav;