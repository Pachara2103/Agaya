import { MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Button1 from "../Button1";
import { useEffect, useState } from "react";
import Profile from "./Profile.jsx";
import Address from "./Address.jsx";
import ChangePasswordForm from "../ProfilePage/ChangePasswordForm";
import { getMe } from "../../libs/authService";
import "./scrollbar.css";

// rgba(221, 221, 221, 0.7)
function ProfileContainer() {
  const [currentPanel, setCurrrentPanel] = useState("profile");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkPanel = (panelName, currentPanel) => {
    if (currentPanel === panelName) return "text-pink-600";
    return "text-gray-500";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        if (response.success) setUserData(response.data);
        else throw new Error("Failed to fetch user data.");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 

  // const username = "User00001";
  const box =
    "border-gray-100 border-1 shadow-[0_0_4px_1px_rgba(221,221,221,0.7)]"; //offsetX, offsetY, blur, spread
  return (
    <div className={`overflow-x-auto`}>
      <div
        className={`max-[1160px]:inline-flex flex flex-row bg-white text-[14px] justify-center`}
      >
        {" "}
        {/* block */}
        <div className={`w-72 ml-10 mr-6 mt-14 mb-8 h-150 bg-white ${box} overflow-y-scroll scrollbar` }>
          <div className={`flex flex-col gap-2 ml-8 mr-8 mt-8`}>
            <div className="flex flex-row text-black mb-6">
              <div className={``}>
                {userData?.profileImageUrl ? (
                  <img
                    src={userData.profileImageUrl}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <MdAccountCircle size={48} className="text-gray-300" />
                )}  
              </div>
              <div className={`flex-col ml-4 self-center`}>
                <div className={`font-[500] mb-1 text-[16px]`}>{userData?.username}</div>
                <div className={`font-[100] text-gray-400 text-[13px]`}>
                  แก้ไขข้อมูลส่วนตัว
                </div>
              </div>
            </div>
            {/* My account */}
            <Button1
              emoji={<VscAccount size={22} />}
              text="บัญชีของฉัน"
              textSize={20}
              handle={() => setCurrrentPanel("profile")}
            />
            <Button1
              text="&emsp;ประวัติ"
              textColor={checkPanel("profile", currentPanel)}
              handle={() => setCurrrentPanel("profile")}
            />
            <Button1
              text="&emsp;บัญชีธนาคาร & บัตร"
              textColor={checkPanel("banks", currentPanel)}
              handle={() => {
                setCurrrentPanel("banks");
              }}
            />
            <Button1
              text="&emsp;ที่อยู่"
              textColor={checkPanel("addresses", currentPanel)}
              handle={() => setCurrrentPanel("addresses")}
            />
            <Button1
              text="&emsp;เปลี่ยนรหัสผ่าน"
              textColor={checkPanel("change-password", currentPanel)}
              handle={() => setCurrrentPanel("change-password")}
            />
            <Button1
              text="&emsp;การตั้งค่าการแจ้งเตือน"
              textColor={checkPanel("privacy-setting", currentPanel)}
              handle={() => setCurrrentPanel("privacy-setting")}
            />
            <Button1
              text="&emsp;ความเป็นส่วนตัว"
              textColor={checkPanel("notification-setting", currentPanel)}
              handle={() => setCurrrentPanel("notification-setting")}
            />
            {/* My purchase */}
            <Button1
              emoji={<LuShoppingBag size={20} />}
              text="การซื้อของฉัน"
              textSize={20}
              handle={() => setCurrrentPanel("to-ship")}
            />
            <Button1
              text="&emsp;ที่ต้องจัดส่ง"
              textColor={checkPanel("to-ship", currentPanel)}
              handle={() => setCurrrentPanel("to-ship")}
            />
            <Button1
              text="&emsp;ที่ต้องได้รับ"
              textColor={checkPanel("to-receive", currentPanel)}
              handle={() => setCurrrentPanel("to-receive")}
            />
            <Button1
              text="&emsp;จัดส่งสำเร็จ"
              textColor={checkPanel("complete", currentPanel)}
              handle={() => setCurrrentPanel("complete")}
            />
            <Button1
              text="&emsp;การคืนสินค้า/คืนเงิน"
              textColor={checkPanel("return-refund", currentPanel)}
              handle={() => setCurrrentPanel("return-refund")}
            />
            <Button1
              text="&emsp;การยกเลิกคำสั่งซื้อ"
              textColor={checkPanel("cancelled", currentPanel)}
              handle={() => setCurrrentPanel("cancelled")}
            />
            {/* Notification */}
            <Button1
              emoji={<MdOutlineNotifications size={20} />}
              text="การแจ้งเตือน"
              textSize={20}
              handle={() => setCurrrentPanel("notifications")}
            />
            {/* My discount */}
            <Button1
              emoji={<IoMdPerson size={20} />}
              text="ส่วนลดของฉัน"
              textSize={20}
              handle={() => setCurrrentPanel("my-vouchers")}
            />  
          </div>
        </div>
        <div
          className={`w-200 ml-6 mr-12 mt-14 mb-8 h-150 bg-white ${box} flex-shrink-0 cursor-default`}
        >
          {currentPanel === "profile" && <Profile userData={userData} />}
          {currentPanel === "change-password" ? <ChangePasswordForm /> : ""}
          {currentPanel === "addresses" ? <Address /> : ""}
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
