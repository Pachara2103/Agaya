import { CiSearch } from "react-icons/ci";
import "./nav.css";

function Nav(){
    return(
        <nav>
        <div className="header">
          <h2 class="text-[#000] text-[18px]">
            Agaya
          </h2>

          <ul className="nav medium">
            <li>เปิดร้านค้าใหม่</li>
            <li>ช่วยเหลือ</li>
            <li>สมัครใหม่</li>
            <li>เข้าสู่ระบบ</li>
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