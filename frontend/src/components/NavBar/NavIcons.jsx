import { useState } from "react";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";

function NavIcons({ isLoggedIn, handleLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="nav-icons">
      <CiHeart size={28} className="nav-icon" />
      <CiShoppingCart size={28} className="nav-icon" />

      {isLoggedIn && (
        <div className="profile-container">
          <CiUser
            size={28}
            className="nav-icon"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && <ProfileDropdown handleLogout={handleLogout} />}
        </div>
      )}
    </div>
  );
}

export default NavIcons;