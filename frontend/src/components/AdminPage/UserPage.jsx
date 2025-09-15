import { LuShoppingBag } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoStorefrontOutline } from "react-icons/io5";
import { PieChart } from "@mui/x-charts/PieChart";

const buttonStyle1 = (text, textColor, bgColor, handler) => {
  return (
    <div
      className={`flex h-10 w-24 ${bgColor} ${textColor} items-center justify-center `}
    >
      {text}
    </div>
  );
};
const userBox = (username, email, editRoleButtonHandler, banButtonHandler) => {
  return (
    <div
      className={`flex h-26 w-full bg-white border-1 border-gray-200 p-4 shadow-[0_0_1px_1px_rgba(221,221,221,0.7)] flex-shrink-0`}
    >
      <div className="flex-1 flex flex-col gap-3 justify-center text-[14px]">
        <div>username: {username}</div>
        <div>email: {email}</div>
      </div>
      <div className="flex-1 flex gap-2  items-center justify-end">
        {buttonStyle1("edit role", "text-white", "bg-[#48B3AF]")}
        {buttonStyle1("ban", "text-white", "bg-[#B71F3B]")}
      </div>
    </div>
  );
};

function UserPage() {
  // #56c4a3ff

  const numberOfUsers = 75;
  const numberOfVendors = 25;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        User management
      </div>
      <div className="flex h-130 bg-white justify-center">
        {/* block */}
        <div className="flex-1 my-6 mx-12 bg-white p-1 text-black">
          <div className="flex gap-2">
            {buttonStyle1("Customer", null, "bg-gray-400")}
            {buttonStyle1("Vendor", null, "bg-gray-400")}
            {buttonStyle1("Admin", null, "bg-gray-400")}
          </div>
          <div className="flex flex-col gap-2 mt-6 overflow-y-auto h-100">
            {userBox("test1", "test1@gmail.com")}
            {userBox("scrollTest", "scrollTest@gmail.com")}
            {userBox("scrollTest", "scrollTest@gmail.com")}
            {userBox("scrollTest", "scrollTest@gmail.com")}
            {userBox("scrollTest", "scrollTest@gmail.com")}

          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
