import { useNavigate } from "react-router-dom";

function NavLinks({ user }) { 
  const nav = useNavigate();
  const isLoggedIn = !!user; 

  return (
    <ul className="nav medium">
      <li className="cursor-pointer" onClick={() => nav("/apply-for-seller")}>
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