import { useNavigate } from "react-router-dom";

function ProfileDropdown({ handleLogout }) {
  const nav = useNavigate();

  return (
    <div className="dropdown-menu">
      <div
        className="dropdown-item"
        onClick={() => nav("/profile")}
      >
        บัญชีของฉัน
      </div>
      <div className="dropdown-item">การซื้อของฉัน</div>
      <div className="dropdown-item" onClick={handleLogout}>
        ออกจากระบบ
      </div>
    </div>
  );
}

export default ProfileDropdown;