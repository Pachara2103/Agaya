import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";

function NavIcons({ user, handleLogout, isDropdownOpen, toggleDropdown, onClose }) {
  return (
    <div className="nav-icons">
      <CiHeart size={28} className="nav-icon" />
      <CiShoppingCart size={28} className="nav-icon" />

      {user && (
        <div className="profile-container">
          <CiUser
            size={28}
            className="nav-icon"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <ProfileDropdown 
              user={user} 
              handleLogout={handleLogout} 
              onClose={onClose} 
            />
          )}
        </div>
      )}
    </div>
  );
}

export default NavIcons;