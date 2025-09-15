import "./nav.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Nav() {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    nav("/signin");
    window.location.reload();
  };

  return (
    <nav>
      <div className="header">
        <div className="header-left">
          <h2 className="text-[#000] text-[18px] cursor-pointer font-bold" onClick={() => nav("/")}>
            Agaya
          </h2>
        </div>

        <div className="header-right">
          <NavLinks isLoggedIn={isLoggedIn} />
          <SearchBar />
          <NavIcons isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
}
export default Nav;