import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

function NavIcons({
  user,
  handleLogout,
  isDropdownOpen,
  toggleDropdown,
  onClose,
  numberOfStoresInCart,
}) {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="nav-icons">
      <CiHeart size={28} className="nav-icon" />
      <div className="relative">
        <CiShoppingCart size={28} className="nav-icon" onClick={()=> goToCart()}/>
        {numberOfStoresInCart > 0 && (
          <div className="absolute -top-2 -right-2 bg-[#B71F3B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {numberOfStoresInCart}
          </div>
        )}
      </div>

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
