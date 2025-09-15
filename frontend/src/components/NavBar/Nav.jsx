import { CiSearch } from "react-icons/ci";
import "./nav.css";
import Signin from "../LoginPage/Signin.jsx";
import signup from "../LoginPage/Signup.jsx";
import { useNavigate } from "react-router-dom";

function Nav(){
  const nav = useNavigate();
    return(
        <nav>
        <div className="header">
          <h2 class="text-[#000] text-[18px] cursor-pointer" onClick={()=>{nav("/")}}>
            Agaya
          </h2>

          <ul className="nav medium">
            <li class="cursor-pointer" onClick={()=>{nav("/apply-for-seller")}}>
              เปิดร้านค้าใหม่
              </li>
            <li>ช่วยเหลือ</li>
            <li class="cursor-pointer" onClick={()=>{nav("/signup")}}>
              สมัครใหม่
            </li>
            <li class="cursor-pointer" onClick={()=>{nav("/signin")}}>
              เข้าสู่ระบบ
            </li>
          </ul>

          <div className="search-box medium">
            <input type="text" placeholder="ค้นหาสินค้าและร้านค้า" />
            <CiSearch size={28} />
          </div>
        </div>
      </nav>

    );
}
export default Nav;