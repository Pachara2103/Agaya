import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import "./nav.css"

function NavLinks({ user }) {
  const [ismenuOpen, setIsMenuOpen] = useState(false)
  const nav = useNavigate();
  const isLoggedIn = !!user;

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      nav("/signin");
      return;
    }

    if (user.userType && user.userType.includes("vendor"))
      nav("/seller-page");
    else nav("/apply-for-seller");
  };
  const onToggleMenu = () => { setIsMenuOpen(!ismenuOpen) }


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
        <ul className="grid grid-cols-3 place-items-center h-15 text-[14px] w-50">
          <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} col-span-1`} onClick={isLoggedIn ? null : () => { nav("/signup") }}  >  สมัครใหม่  </li>
          <li className={`${isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"} col-span-1`} onClick={isLoggedIn ? null : () => { nav("/signin") }}  > เข้าสู่ระบบ  </li>
          <li className="relative">
            <MdOutlineMenu size={25} className="relative col-span-1 cursor-pointer" onClick={onToggleMenu} />
            {ismenuOpen && (
              <ul className="w-30  left-0 top-8 absolute text-[#333] bg-white flex flex-col rounded-sm">
                <li className="cursor-pointer p-2 hover:bg-[#f5f5f5] z-10" onClick={handleApplyClick}> {user?.userType?.includes("vendor") ? "ร้านค้าของฉัน" : "เปิดร้านค้าใหม่"}</li>
                <li className="p-2 hover:bg-[#f5f5f5] cursor-pointer z-10">ช่วยเหลือ</li>
              </ul>
            )}

          </li>




        </ul>
      </div>

    </div>

  );
}

export default NavLinks;