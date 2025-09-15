import Footer from "../Footer/Footer";
import { MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Button1 from "../Button1";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

import ImageUploader from "../SellerPage/ImageUploader"; 
import { updateMe } from "../../libs/authService";
import { uploadProductImage } from "../../libs/productService";
// rgba(221, 221, 221, 0.7)
function Profile({ userData }) {
  // const { email, name, phoneNumber, dob } = {
  //   email: "test1gmail.com",
  //   name: "test1",
  //   phoneNumber: "0000000098",
  //   dob: new Date(2025, 8, 15),
  // };

  const {
    username: originalName,
    email,
    phoneNumber: originalPhoneNumber,
    dateOfBirth: originalDobString,
    gender: originalGender,
  } = userData;
  const originalDob = originalDobString ? new Date(originalDobString) : null;

  const [selectedFile, setSelectedFile] = useState(null);

  const [updatedData, setUpdatedData] = useState(false);
  const [updatedName, setUpdatedName] = useState(originalName || "");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(originalPhoneNumber || "");
  const [dateOfBirthDate, setDateOfBirthDate] = useState(originalDob);
  const [updatedGender, setUpdatedGender] = useState(originalGender || "male");

  const checkChangedData = () => {
    if (updatedName !== originalName) {
      setUpdatedData(true);
      return;
    }
    if (updatedPhoneNumber !== originalPhoneNumber) {
      setUpdatedData(true);
      return;
    }
    if (updatedGender !== originalGender) {
      setUpdatedData(true);
      return;
    }
    if (dateOfBirthDate?.getTime() !== originalDob?.getTime()) {
      setUpdatedData(true);
      return;
    }
    setUpdatedData(false);
    return;
  };
  const checkPanel = (panelName, currentPanel) => {
    if (currentPanel === panelName) return "text-pink-600";
    return "text-gray-500";
  };

  useEffect(() => {
    checkChangedData();
  }, [updatedName, updatedPhoneNumber, updatedGender, dateOfBirthDate]);
  const genderSelectedStyle =
    "w-3.5 h-3.5 bg-pink-500 border-3 border-black rounded-full self-center";
  const genderRadioStyle =
    "w-3.5 h-3.5 bg-black border-3 border-black rounded-full self-center";
  const labelStyle = `self-center text-right text-gray-700`;

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUpdatedData(true); 
  };

  const handleSave = async () => {
    if (!updatedData) return; 

    try {
      let imageUrl = userData.profileImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await uploadProductImage(formData); 
        if (uploadRes.success) {
          imageUrl = uploadRes.imageUrl;
        } else {
          throw new Error("Profile image upload failed");
        }
      }
      
      const dataToUpdate = {
        username: updatedName,
        phoneNumber: updatedPhoneNumber,
        gender: updatedGender,
        dateOfBirth: dateOfBirthDate,
        profileImageUrl: imageUrl, 
      };

      const res = await updateMe(dataToUpdate);
      if (res.success) {
        alert("อัปเดตข้อมูลสำเร็จ!");
        window.location.reload();
      } else {
        alert("อัปเดตข้อมูลไม่สำเร็จ: " + (res.message || ""));
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  const username = "User00001";
  const box =
    "border-gray-100 border-1 shadow-[0_0_4px_1px_rgba(221,221,221,0.7)]"; //offsetX, offsetY, blur, spread
  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[18px] font-[600] text-black">
        ข้อมูลของฉัน
      </div>
      <div className="flex h-130 bg-white justify-center">
        {" "}
        {/* block */}
        <div className="flex-2 my-6 ml-6 bg-white text-black">
          <div className="grid grid-cols-4 mt-10 mx-10 gap-4">
            <div className={labelStyle}>ชื่อผู้ใช้</div>
            <input
              onChange={(e) => {
                const newValue = e.target.value;
                setUpdatedName(newValue);
              }}
              type="text"
              name="name"
              value={updatedName}
              className="px-2 border-1 col-span-3 h-10 self-center rounded-[3px]"
            />
            <div className={labelStyle}>อีเมล</div>
            <div className="px-2 col-span-3 h-10 flex items-center">
              {email}
            </div>
            <div className={labelStyle}>เบอร์โทรศัพท์</div>
            <input
              onChange={(e) => {
                const newValue = e.target.value;
                setUpdatedPhoneNumber(newValue);
              }}
              type="text"
              name="phoneNumber"
              value={updatedPhoneNumber}
              className="px-2 border-1 col-span-3 h-10 self-center rounded-[3px]"
            />
            <div className={labelStyle}>เพศ</div>
            <div className="flex col-span-3 gap-2">
              <div className=""></div>
              <div
                onClick={() => setUpdatedGender("male")}
                className={
                  updatedGender === "male"
                    ? genderSelectedStyle
                    : genderRadioStyle
                }
              ></div>
              <span>Male</span>
              <div
                onClick={() => setUpdatedGender("female")}
                className={
                  updatedGender === "female"
                    ? genderSelectedStyle
                    : genderRadioStyle
                }
              ></div>
              <span>Female</span>
              <div
                onClick={() => setUpdatedGender("other")}
                className={
                  updatedGender === "other"
                    ? genderSelectedStyle
                    : genderRadioStyle
                }
              ></div>
              <span>Other</span>
            </div>
            <div className={labelStyle}>วัน/เดือน/ปีเกิด</div>
            <div className="col-span-3 h-10 flex items-center">
              <DatePicker
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()} // ปีใหม่สุด (13+ ปี)
                className="px-2 border border-gray-300 col-span-3 h-10 self-center rounded-[3px]"
                selected={dateOfBirthDate}
                onChange={(date) => setDateOfBirthDate(date)}
              />
              {/* {dob} */}
              <div className="text-blue-500 ml-5"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-black my-6 mr-6 bg-white">
          <div className="flex flex-col flex-1 bg-white items-center justify-start gap-2">
            {/* <div className={`text-black`}>
              <MdAccountCircle size={120} />
            </div> */}
            <ImageUploader
              onFileSelect={handleFileSelect}
              initialImage={userData.profileImageUrl}
            />
            <div
              className={`h-12 w-36 flex items-center justify-center rounded-md text-black shadow-[0_0_2px_1px_rgba(200,200,200,0.8)] cursor-pointer`}
            >
              เลือกรูป
            </div>
            <div className="flex flex-col gap-1 text-[12px]">
              <div className="text-gray-500">ขนาดไฟล์: สูงสุด 1 MB</div>
              <div className="text-gray-500">ไฟล์ที่รองรับ: .JPEG, .PNG</div>
            </div>
          </div>
          <div
            onClick={handleSave}
            className={`h-12 w-36 mb-10 ${
              updatedData
                ? "bg-[#48B3AF] cursor-pointer"
                : "bg-gray-600 cursor-pointer"
            } flex self-center items-center justify-center rounded-md text-white shadow-[0_0_2px_1px_rgba(200,200,200,0.8)] `}
          >
            ยืนยัน
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
