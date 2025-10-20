import { useNavigate } from "react-router-dom";

function NavLinks({ user }) { 
  const nav = useNavigate();
  const isLoggedIn = !!user; 

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      nav("/signin");
      window.location.reload(); 
      return;
    }

    if (user.userType && user.userType.includes("vendor")) {
      nav("/seller-page");
      window.location.reload(); 
    } else {
      nav("/apply-for-seller");
      window.location.reload(); 
    }
  };

  return (
    <ul className="nav medium">
      <li className="cursor-pointer" onClick={handleApplyClick}>
        {user?.userType?.includes("vendor") ? "ร้านค้าของฉัน" : "เปิดร้านค้าใหม่"}
      </li>
      <li>ช่วยเหลือ</li>
      <li
        className={isLoggedIn ? "disabled-link" : "cursor-pointer"}
        onClick={isLoggedIn ? null : () => {
          nav("/signup")
          window.location.reload(); 
        }}
      >
        สมัครใหม่
      </li>
      <li
        className={isLoggedIn ? "disabled-link" : "cursor-pointer"}
        onClick={isLoggedIn ? null : () => {
          nav("/signin")
          window.location.reload(); 
        }}
      >
        เข้าสู่ระบบ
      </li>
    </ul>
  );
}

export default NavLinks;