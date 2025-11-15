import { BackButton } from "./CreateAccountProcess";
import "./.css";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { createUser } from "../../services/fetchUserUtils";
import { setnewPassword } from "../../services/userService";
import { useAuth} from "../../context/AuthContext"

const PasswordInput = ({ onNext, onBack, type, account, details }) => {
  const { login } = useAuth()
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [format1, setFormat1] = useState(true);
  const [format2, setFormat2] = useState(false);
  const [format3, setFormat3] = useState(false);
  const [format4, setFormat4] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const check = {
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      digit: /[0-9]/.test(password),
      length: password.length > 8,
    };
    setFormat1(check.lower);
    setFormat2(check.upper);
    setFormat3(check.digit);
    setFormat4(check.length);
    setDisable(!(check.lower && check.upper && check.digit && check.length));
  }, [password]);

  const formatText = [
    { text: "ตัวพิมพ์เล็ก อย่างน้อย 1 ตัว (a-z)", display: format1 },
    { text: "ตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว (A-Z)", display: format2 },
    { text: "ตัวเลข อย่างน้อย 1 ตัว (0-9)", display: format3 },
    { text: "ความยาวเกิน 8 ตัวอักษร", display: format4 },
  ];

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitPassword = async () => {
    console.log(type);
    if (type == "register") {
      await register();
    } else if (type == "forgetpassword") {
      await forgetPassword();
    }
  };

  const register = async () => {
    try {
      const res = await createUser({
        email: account,
        password: password,
      });

      if (res.success && res.token) {
        login(res.data.user, res.token);
        onNext();
      } else {
        throw new Error(res.message || "การสมัครสมาชิกล้มเหลว");
      }
      console.log(res);
      onNext();
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const forgetPassword = async () => {
    try {
      const res = await setnewPassword(account, password);
      console.log(res);
      onNext();
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <div className="otp-input-box">
      <div className="relative flex flex-col justify-center items-center text-[#000] gap-2 mt-3">
        <BackButton onBack={()=>onBack()} />

        <h1 className="text-[18px] font-bold mt-1.5">ตั้งรหัสผ่าน</h1>
        <p class="flex flex-col items-center justify-center font-medium gap-[5px] text-[14px]">
          {details}
        </p>
      </div>

      <div className="text-[14px] flex flex-col mx-[20px] text-[#c9c9c9]">
        <div className="flex flex-row relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="รหัสผ่าน"
            class="w-full h-[40px] outline-none border-2 border-[#c9c9c9] text-[#c9c9c9] bg-white my-[10px] pl-[10px] focus:text-black focus:border-black"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !disable) {
                submitPassword();
              }
            }}
          />
          {showPassword && (
            <FaRegEye
              onClick={toggleShowPassword}
              className="absolute right-[10px] top-[20px] cursor-pointer z-[100]"
              size={20}
              color="#000"
            />
          )}
          {!showPassword && (
            <FaRegEyeSlash
              className="absolute right-[10px] top-[20px] cursor-pointer z-[100]"
              onClick={toggleShowPassword}
              size={20}
              color="#000"
            />
          )}
        </div>

        {formatText.map((item, index) => (
          <div
            class="flex flex-row gap-[15px] items-center justify-start box-border p-[5px] px-5"
            key={index}
          >
            <li className={item.display ? "text-[#35e401]" : ""}>
              {item.text}
            </li>
            {item.display && <IoCheckmarkCircle color="#35E401" size={15} />}
          </div>
        ))}

        <button
          onClick={() => submitPassword()}
          className={disable ? "button-disable mt-5 button1" : "mt-5 button1"}
          disabled={disable}
        >
          สมัครใหม่
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
