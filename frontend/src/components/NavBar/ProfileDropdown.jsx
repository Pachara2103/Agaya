import { useNavigate } from "react-router-dom";

function ProfileDropdown({ user, handleLogout, onClose }) {
  const nav = useNavigate();

  const handleNavigate = (path) => {
    nav(path);
    onClose();
  };

  const handleLogoutClick = () => handleLogout();
  const handleOrderPage = (path) =>  nav(path, { state: { panel: "order", }, });

  return (
    <div className="dropdown-menu">
      <div className="dropdown-item" onClick={() => handleNavigate("/profile")}>    บัญชีของฉัน    </div>

      {user && user.userType.includes("admin") && (
        <div className="dropdown-item" onClick={() => handleNavigate("/dashboard")} >  แดชบอร์ด   </div>
      )}

      <div className="dropdown-item" onClick={() => handleOrderPage("/profile")}>การซื้อของฉัน</div>
      <div className="dropdown-item" onClick={handleLogoutClick}>      ออกจากระบบ    </div>
    </div>
  );
}

export default ProfileDropdown;
