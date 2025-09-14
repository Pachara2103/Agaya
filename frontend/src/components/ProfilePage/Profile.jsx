import Footer from '../Footer/Footer';
import { MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Button1 from '../Button1';
import { useState } from 'react';
// rgba(221, 221, 221, 0.7)
function Profile() {
  
  const { email, name, phoneNumber, dob } = {
  email: "te*********@gmail.com",
  name: "test1",
  phoneNumber: "********98",
  dob: "**/**/2004"
};
  const checkPanel = (panelName, currentPanel) => {
    if(currentPanel === panelName) return "text-pink-600"
    return "text-gray-500"
  }

  const [currentPanel, setCurrrentPanel] = useState("profile");
  const [gender, setGender] = useState("male");
  const genderSelectedStyle = "w-3.5 h-3.5 bg-pink-500 border-3 border-black rounded-full self-center";
  const genderRadioStyle = "w-3.5 h-3.5 bg-black border-3 border-black rounded-full self-center";
  const labelStyle = `self-center text-right text-gray-700`;

  const username = "User00001";
  const box = "border-gray-100 border-1 shadow-[0_0_4px_1px_rgba(221,221,221,0.7)]"; //offsetX, offsetY, blur, spread
  return (
    <div className={`overflow-x-auto`}>
      <div className={`max-[1160px]:inline-flex flex flex-row bg-white text-[14px] justify-center`}>  {/* block */}
        <div className={`w-64 ml-10 mr-6 mt-14 mb-8 h-150 bg-white ${box}`} >
          <div className={`flex flex-col gap-2 ml-8 mr-8 mt-8`}>
            <div className='flex flex-row text-black mb-6'>
              <div className={``}><MdAccountCircle size={50} /></div>
              <div className={`flex-col ml-4 self-center`}>
                <div className={`font-[500] mb-1 text-[16px]`}>{username}</div>
                <div className={`font-[100] text-gray-400 text-[13px]`}>แก้ไขข้อมูลส่วนตัว</div>
              </div>
            </div>
            <Button1 emoji={<VscAccount size={22}/>} text="บัญชีของฉัน" textSize={20} handle={() => alert(`${currentPanel}`)}/>
            <Button1 text="&emsp;ประวัติ" textColor={checkPanel("profile", currentPanel)} handle={() => setCurrrentPanel("profile")}/>
            <Button1 text="&emsp;บัญชีธนาคาร & บัตร" textColor={checkPanel("banks", currentPanel)} handle={() => {setCurrrentPanel("banks")}}/>
            <Button1 text="&emsp;ที่อยู่" textColor={checkPanel("addresses", currentPanel)} handle={() => setCurrrentPanel("addresses")}/>
            <Button1 text="&emsp;เปลี่ยนรหัสผ่าน" textColor={checkPanel("change-password", currentPanel)} handle={() => setCurrrentPanel("change-password")}/>
            <Button1 text="&emsp;การตั้งค่าการแจ้งเตือน" textColor={checkPanel("privacy-setting", currentPanel)} handle={() => setCurrrentPanel("privacy-setting")}/>
            <Button1 text="&emsp;ความเป็นส่วนตัว" textColor={checkPanel("notification-setting", currentPanel)} handle={() => setCurrrentPanel("notification-setting")}/>
            <Button1 emoji={<LuShoppingBag size={20}/>} text="การซื้อของฉัน" textSize={20} handle={() => setCurrrentPanel("my-purchase")}/>
            <Button1 emoji={<MdOutlineNotifications size={20}/>} text="การแจ้งเตือน" textSize={20} handle={() => setCurrrentPanel("notifications")}/>
            <Button1 emoji={<IoMdPerson size={20}/>} text="ส่วนลดของฉัน" textSize={20} handle={() => setCurrrentPanel("my-vouchers")}/>

          </div>
          
        </div>
        <div className={`w-200 ml-6 mr-12 mt-14 mb-8 h-150 bg-white ${box} flex-shrink-0 cursor-default`}>
          <div className='flex h-20 items-center pl-14 text-[18px] font-[600] text-black'>ข้อมูลของฉัน</div>
          <div className='flex h-130 bg-white justify-center'>  {/* block */}
            <div className='flex-2 my-6 ml-6 bg-white text-black'>
              <div className='grid grid-cols-4 mt-10 mx-10 gap-4'>
                <div className={labelStyle}>ชื่อผู้ใช้</div>
                <input type="text" name="name" placeholder={name} className='px-2 border-1 col-span-3 h-10 self-center rounded-[3px]'/>
                <div className={labelStyle}>อีเมล</div>
                <div className='px-2 col-span-3 h-10 flex items-center'>{email}</div>
                <div className={labelStyle}>เบอร์โทรศัพท์</div>
                <div className='px-2 col-span-3 h-10 flex items-center'>{phoneNumber}</div>
                <div className={labelStyle}>เพศ</div>
                <div className='flex col-span-3 gap-2'>
                  <div className=""></div>
                  <div onClick={() => setGender("male")} className={gender === "male" ? genderSelectedStyle : genderRadioStyle}></div>
                  <span>Male</span>
                  <div onClick={() => setGender("female")} className={gender === "female" ? genderSelectedStyle : genderRadioStyle}></div>
                  <span>Female</span>
                  <div onClick={() => setGender("other")} className={gender === "other" ? genderSelectedStyle : genderRadioStyle}></div>
                  <span>Other</span>
                </div>
                <div className={labelStyle}>วัน/เดือน/ปีเกิด</div>
                <div className='px-2 col-span-3 h-10 flex items-center'>{dob}</div>
              </div>
            </div>
            <div className='flex flex-col flex-1 text-black my-6 mr-6 bg-white'>

            <div className='flex flex-col flex-1 bg-white items-center justify-start gap-2'>
              <div className={`text-black`}><MdAccountCircle size={120} /></div>
              <div className={`h-12 w-36 flex items-center justify-center rounded-md text-black shadow-[0_0_2px_1px_rgba(200,200,200,0.8)] cursor-pointer`}>เลือกรูป</div>
              <div className='flex flex-col gap-1 text-[12px]'>
                <div className='text-gray-500'>ขนาดไฟล์: สูงสุด 1 MB</div> 
                <div className='text-gray-500'>ไฟล์ที่รองรับ: .JPEG, .PNG</div> 
              </div>
            </div>
            <div className={`h-12 w-36 mb-10 bg-[#48B3AF] flex self-center items-center justify-center rounded-md text-white shadow-[0_0_2px_1px_rgba(200,200,200,0.8)] cursor-pointer`}>ยืนยัน</div>
            </div>
            
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>

  )
}

export default Profile;