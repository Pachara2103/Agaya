import "./.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiArrowLongRight } from "react-icons/hi2";
import ArrowLeft from "../../assets/arrow-left.png";
import { FaCheck } from "react-icons/fa";

import OtpInput from "./OtpInput";
import PasswordInput from "./PasswordInput";

export const BackButton = ({ onBack }) => {
  return (
    <img
      src={ArrowLeft}
      class="absolute left-0 top-[-5px] cursor-pointer w-[10%]"
      onClick={() => {
        onBack();
      }}
    />
  );
};

const Redirect = ({ countdown }) => {
  return (
    <div className="otp-input-box">
      <div className="relative flex flex-col justify-center items-center text-[#000] gap-2 mt-3">
        <BackButton />
        <h1 className="text-[18px] font-bold pt-2">สมัครสมาชิกเสร็จสิ้น</h1>
      </div>

      <div class="flex items-center justify-center text-base h-full pb-10">
        <p>ระบบจะนำท่านเข้าสู่ หน้าหลักในอีก {countdown} วินาที...</p>
      </div>
    </div>
  );
};

const procress = ["ยืนยันหมายเลขโทรศัพท์", "ตั้งรหัสผ่าน", "เสร็จสิ้น"];

function CreateAccountProcess({ account }) {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [email, setEmail] = useState("");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (state != 2) return;
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, state]);

  const nextState = (email) => {
    if (email) {
      setEmail(email);
    }

    if (state == 0) {
      navigate(`/signup?step=set-password`);
      setState(state + 1);
    }
    if (state == 1) {
      setState(state + 1);
      navigate("/signup?step=done");
    } else {
      return;
    }
  };
  const backToSignup = () => {
    window.location.href = "/signup";
    return;
  };

  const renderStepContent = () => {
    switch (state) {
      case 0:
        return (
          <OtpInput
            account={account}
            onNext={nextState}
            onBack={backToSignup}
          />
        );
      case 1:
        return (
          <PasswordInput
            account={email}
            onNext={nextState}
            type="register"
            onBack={backToSignup}
          />
        );
      case 2:
        return <Redirect countdown={countdown} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[10px] w-[50vw] ">
      <div className="flex flex-row items-center justify-center mb-[20px] w-[50vw]">
        {procress.map((text, index) => (
          <div class="flex flex-row gap-2" key={index}>
            <div className={state >= index ? "otp-focus" : "otp-nfocus"}>
              <div className="circle">
                <p className="text-[18px]">
                  {index < 2 ? (
                    index + 1
                  ) : (
                    <FaCheck size={20} color={state > 1 ? "" : "#C9C9C9"} />
                  )}
                </p>
              </div>
              <p className="text-[12px]">{text}</p>
            </div>

            {index < 2 && (
              <HiArrowLongRight
                size={50}
                color={state > 0 ? "#35e421" : "#c9c9c9"}
              />
            )}
          </div>
        ))}
      </div>

      {renderStepContent()}
    </div>
  );
}

export default CreateAccountProcess;
