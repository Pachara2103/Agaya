import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

function NavIcons({
  user,
  handleLogout,
  isDropdownOpen,
  toggleDropdown,
  onClose,
}) {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="nav-icons">
      <CiHeart size={28} className="nav-icon" />
      <CiShoppingCart size={28} className="nav-icon" onClick={()=> goToCart()}/>

      {user && (
        <div className="profile-container">
          <CiUser size={28} className="nav-icon" onClick={toggleDropdown} />
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
