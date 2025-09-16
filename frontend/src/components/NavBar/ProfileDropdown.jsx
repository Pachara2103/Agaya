import { useNavigate } from "react-router-dom";

function ProfileDropdown({ user, handleLogout, onClose }) {
  const nav = useNavigate();

  const handleNavigate = (path) => {
    nav(path);
    onClose(); 
  };

  const handleLogoutClick = () => {
    handleLogout();
  }

  return (
    <div className="dropdown-menu">
      <div
        className="dropdown-item"
        onClick={() => handleNavigate("/profile")}
      >
        บัญชีของฉัน
      </div>

      {user && user.userType.includes('admin') && (
        <div 
          className="dropdown-item"
          onClick={() => handleNavigate("/dashboard")}
        >
          Dashboard
        </div>
      )}

      <div className="dropdown-item">การซื้อของฉัน</div>
      <div className="dropdown-item" onClick={handleLogoutClick}>
        ออกจากระบบ
      </div>
    </div>
  );
}

export default ProfileDropdown;