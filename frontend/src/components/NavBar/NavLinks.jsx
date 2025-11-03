import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import "./nav.css"

function NavLinks({ user, handleLogout, onClose, }) {
  const [ismenuOpen, setIsMenuOpen] = useState(false)
  const nav = useNavigate();
  const isLoggedIn = !!user;

  const handleNavigate = (path) => {
    nav(path);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsMenuOpen(false);

  }
  const handleOrderPage = (path) => {
    nav(path, { state: { panel: "order", }, });
    setIsMenuOpen(false);

  };


  const handleApplyClick = () => {
    if (!isLoggedIn) {
      handleNavigate("/signin");
      return;
    }

    if (user.userType && user.userType.includes("vendor")) handleNavigate("/seller-page");
    else handleNavigate("/apply-for-seller");
  };
  const onToggleMenu = () => { setIsMenuOpen(!ismenuOpen) }
  const hoverClass = 'p-3 px-5 hover:bg-[#f5f5f5] z-10';


  return (
    <div className="text-black" >
      <div className="menu">
        <ul className="grid grid-cols-4 place-items-center h-15 text-[14px] lg:text-[16px] w-90 lg:w-120">
          <li className="cursor-pointer col-span-1" onClick={handleApplyClick}> {user?.userType?.includes("vendor") ? "ร้านค้าของฉัน" : "เปิดร้านค้าใหม่"}</li>
          <li className="col-span-1">ช่วยเหลือ</li>
          <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} col-span-1`} onClick={isLoggedIn ? null : () => { nav("/signup") }}  >  สมัครใหม่  </li>
          <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} col-span-1`} onClick={isLoggedIn ? null : () => { nav("/signin") }}  > เข้าสู่ระบบ  </li>
        </ul>
      </div>

      <div className="sm:hidden">
        <ul className="flex justify-end items-center h-15 text-[14px] w-50">

          <li className="relative mx-5">
            <MdOutlineMenu size={25} className="relative col-span-1 cursor-pointer" onClick={onToggleMenu} />
            {ismenuOpen && (
              <ul className="w-35 right-0 top-8 absolute text-[#333] bg-white flex flex-col rounded-sm z-5 shadow-md">
                <li className="dropdown-item" onClick={() => handleNavigate("/profile")}>    บัญชีของฉัน    </li>

                {user && user.userType.includes("admin") && (
                  <li className="dropdown-item" onClick={() => handleNavigate("/dashboard")} >  Dashboard   </li>
                )}

                <li className="dropdown-item" onClick={() => handleOrderPage("/profile")}>การซื้อของฉัน</li>
                <li className={`cursor-pointer ${hoverClass}`} onClick={()=> handleNavigate('/result-search')}> ค้าหาสินค้า</li>
                <li className={`cursor-pointer ${hoverClass}`} onClick={handleApplyClick}> รายการโปรด</li>
                <li className={`cursor-pointer ${hoverClass}`} onClick={handleApplyClick}> ตะกร้าของฉัน </li>
                <li className={`cursor-pointer ${hoverClass}`} onClick={handleApplyClick}> {user?.userType?.includes("vendor") ? "ร้านค้าของฉัน" : "เปิดร้านค้าใหม่"}</li>
                <li className={`cursor-pointer ${hoverClass}`} >ช่วยเหลือ</li>
                <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} ${hoverClass}`} onClick={isLoggedIn ? null : () => { handleNavigate("/signup") }}  >  สมัครใหม่  </li>
                {user && (
                  <li className="dropdown-item" onClick={handleLogoutClick}>      ออกจากระบบ    </li>
                )}
                {!user && (
                  <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} ${hoverClass}`} onClick={isLoggedIn ? null : () => { handleNavigate("/signin") }}  > เข้าสู่ระบบ  </li>
                )}

              </ul>
            )}

          </li>

        </ul>
      </div>

    </div>

  );
}

export default NavLinks;