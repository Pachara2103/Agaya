import { useEffect, useState } from "react";
import "./.css";

import { findByEmail, sendOTP } from "../../services/userService.js";
import { BackButton } from "./CreateAccountProcess.jsx";


const EmailInput = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [aleart, setAleart] = useState("อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง");
  const [invalid, setInvalid] = useState(false);
  const [disable, setDisable] = useState(false);

  const nextState = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setInvalid(true);
      setAleart("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }
    try {
      if (emailRegex.test(email)) {
        const res = await findByEmail(email.trim());
        console.log(res.data);

        if (res.data.length == 0) {
          setInvalid(true);
          setAleart("ไม่มีอีเมลนี้ในระบบ");
          return;
        }

        onNext(email);
        const send = await sendOTP(email);
        console.log(send.message);
      } else {
        setInvalid(true);
        setAleart("กรุณากรอกอีเมลให้ถูกต้อง");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 5000);
    }
  }, [invalid]);

  useEffect(() => {
    if (!email) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email]);

  return (
    <div class="shadow-[0_0_5px_rgba(0,0,0,0.2)] w-[28vw] h-[18vw] flex flex-col justify-between p-2.5 pb-5 text-black gap-2.5">
      <div className="relative flex flex-col justify-center items-center text-[#000] gap-2 mt-3 ">
        <BackButton onBack={() => onBack()} />
        <h1 className="text-[18px] font-bold pt-2">ตั้งรหัสผ่านใหม่</h1>
      </div>

      <div class="w-full flex flex-col gap-[10px] mx-auto h-full justify-center relative">
        <input
          type="email"
          placeholder="กรุณาใส่อีเมล"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && !disable) {
              nextState();
            }
          }}
          className=" h-[45px] border rounded-[3px] border-gray-400 mb-4 outline-none text-gray-500 focus:text-black mx-5 px-2"
        />
        {invalid && (
          <p className="text-red-500 mb-2 text-sm absolute bottom-22 left-5">
            {aleart}
          </p>
        )}

        <button
          className={disable ? "opacity-70 mx-5 button1" : "mx-5 button1"}
          disabled={disable}
          onClick={() => nextState()}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default EmailInput;
