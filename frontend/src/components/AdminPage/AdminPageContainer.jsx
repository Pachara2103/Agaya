import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import DashboardPage from "./DashboardPage";
import Button1 from "../Button1";
function AdminPageContainer () {
  const [currentPanel, setCurrrentPanel] = useState("user");
  const checkPanel = (panelName, currentPanel, header = 0) => {
    if (currentPanel === panelName && header === 0) return "text-pink-600";
    if (currentPanel === panelName && header === 1) return "text-pink-800 font-[600]";
    if(header === 1) return "text-black";
    return "text-gray-500";
  };
  const username = "Admin Dashboard";
  const box =
    "border-gray-100 border-1 shadow-[0_0_4px_1px_rgba(221,221,221,0.7)]"; //offsetX, offsetY, blur, spread
  return (
    <div className={`overflow-x-auto`}>
      <div
        className={`max-[1160px]:inline-flex flex flex-row bg-white text-[14px] justify-center`}
      >
        {" "}
        {/* block */}
        <div className={`w-64 ml-10 mr-6 mt-14 mb-8 h-150 bg-white ${box}`}>
          <div className={`flex flex-col gap-2 ml-8 mr-8 mt-8`}>
            <div className="flex flex-row text-black mb-6">
              <div className={``}>
                <MdAccountCircle size={50} />
              </div>
              <div className={`flex-col ml-4 self-center`}>
                <div className={`font-[500] mb-1 text-[14px]`}>{username}</div>
              </div>
            </div>
            <Button1
              emoji={<VscAccount size={22} />}
              text="การจัดการ"
              textColor={checkPanel("dashboard", currentPanel, 1)}
              textSize={20}
              handle={() => setCurrrentPanel("dashboard")}
            />
            <Button1
              text="&emsp;ผู้ใช้งาน"
              textColor={checkPanel("user", currentPanel)}
              handle={() => setCurrrentPanel("user")}
            />
            <Button1
              text="&emsp;สินค้า"
              textColor={checkPanel("product", currentPanel)}
              handle={() => {
                setCurrrentPanel("product");
              }}
            />
            <Button1
              text="&emsp;ประเภทสินค้า"
              textColor={checkPanel("category", currentPanel)}
              handle={() => setCurrrentPanel("category")}
            />
            <Button1
              text="&emsp;การอนุมัติผู้ขาย"
              textColor={checkPanel("approve-vendor", currentPanel)}
              handle={() => setCurrrentPanel("approve-vendor")}
            />
          </div>
        </div>
        <div
          className={`w-200 ml-6 mr-12 mt-14 mb-8 h-150 bg-white ${box} flex-shrink-0 cursor-default`}
        >
          {currentPanel === "dashboard" ? <DashboardPage/> : <></>}
        </div>
      </div>
    </div>
  );
}
export default AdminPageContainer;