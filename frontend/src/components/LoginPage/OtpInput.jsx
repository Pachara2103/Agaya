import { useEffect, useState } from "react";
import "./.css";
import { BackButton } from "./CreateAccountProcess";
import { useNavigate } from "react-router-dom";

import { verifyOTP } from "../../libs/userService";

const OtpInput = ({ account, onNext }) => {
  const [OTP, setOTP] = useState(Array(6).fill(""));
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [disableOTP, setDisableOTP] = useState(true);
  const navigate = useNavigate();

  const beforeNext = async () => {
    const check = await verifyOTP(account, OTP.join(""));
    if (check.success) {
      navigate(`/signup?step=set-password`, {
        state: { account },
      });
      onNext();
    } else {
      setInvalidOTP(true);
      console.log("Invalid OTP");
      setTimeout(() => {
        setInvalidOTP(false);
        return;
      }, 5000);
    }
  };

  useEffect(() => {
    if (OTP.join("").length == 6) {
      setDisableOTP(false);
    } else {
      setDisableOTP(true);
    }
  }, [OTP]);

  const fillOTPInput = (e, i) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...OTP];
      newOtp[i] = value;
      setOTP(newOtp);

      if (i < OTP.length - 1) {
        e.target.nextSibling.focus();
      }
    } else if (value === "") {
      const newOtp = [...OTP];
      newOtp[i] = "";
      setOTP(newOtp);
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !OTP[i] && i > 0) {
      e.target.previousSibling.focus();
    }
    if (e.key == "Enter") {
      beforeNext();
    }
  };

  return (
    <div className="otp-input-box">
      <div className="relative flex flex-col justify-center items-center text-[#000] gap-2 mt-3">
        <BackButton onClick={() => onBack()} />
        <h1 className="text-[18px] font-bold pt-2">กรอกรหัสยืนยันตัวตน</h1>
        <div className="text-[14px] flex flex-col items-center justify-center font-medium gap-[5px]">
          <p>รหัสยืนยันตัวตนจะถูกส่งไปยัง Email ที่</p>
          <p>{account}</p>
        </div>
      </div>

      <div class="w-full h-[40%] flex flex-row gap-[10px] relative justify-center items-center">
        {invalidOTP && (
          <p class="absolute top-0 w-full text-center text-red-500 m-0">
            กรุณาใส่รหัส OTP ให้ถูกต้อง
          </p>
        )}
        {OTP.map((digit, i) => (
          <input
            type="text"
            key={i}
            inputMode="numeric"
            pattern="[0-9]*"
            className="otp-input text-[18px]"
            maxLength={1}
            value={digit}
            onChange={(e) => fillOTPInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>

      <div className="text-[12px] h-[50px] flex flex-col items-center justify-center gap-[2px] text-black">
        <p>ไม่ได้รับรหัส ?</p>
        <div class="flex flex-row justify-center items-center gap-[4px]">
          <p className="text-[#7979ff] cursor-pointer">ส่งอีกครั้ง</p>
          <p>หรือลองใช้</p>
          <p className="text-[#7979ff] cursor-pointer">วิธีอื่น</p>
        </div>
      </div>

      <button
        className={disableOTP ? "opacity-70 mx-5" : "mx-5"}
        disabled={disableOTP}
        onClick={beforeNext}
      >
        ถัดไป
      </button>
    </div>
  );
};

export default OtpInput;
