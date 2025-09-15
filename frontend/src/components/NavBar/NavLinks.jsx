import { useNavigate } from "react-router-dom";

function NavLinks({ user }) { 
  const nav = useNavigate();
  const isLoggedIn = !!user; 

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      nav("/signin");
      return;
    }

    if (user.userType && user.userType.includes("vendor")) {
      nav("/seller-page");
    } else {
      nav("/apply-for-seller");
    }
  };

  return (
    <ul className="nav medium">
      <li className="cursor-pointer" onClick={handleApplyClick}>
        เปิดร้านค้าใหม่
      </li>
      <li>ช่วยเหลือ</li>
      <li
        className={isLoggedIn ? "disabled-link" : "cursor-pointer"}
        onClick={isLoggedIn ? null : () => nav("/signup")}
      >
        สมัครใหม่
      </li>
      <li
        className={isLoggedIn ? "disabled-link" : "cursor-pointer"}
        onClick={isLoggedIn ? null : () => nav("/signin")}
      >
        เข้าสู่ระบบ
      </li>
    </ul>
  );
}

export default NavLinks;