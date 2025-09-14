import "./.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { HiArrowLongRight } from "react-icons/hi2";
import ArrowLeft from "../../assets/arrow-left.png";
import { FaCheck } from "react-icons/fa";

import OtpInput from "./OtpInput";
import PasswordInput from "./PasswordInput";
import Redirect from "./Redirect";

export const BackButton = () => {
  return (
    <img
      src={ArrowLeft}
      class="absolute left-0 top-[-5px] cursor-pointer w-[10%]"
      onClick={() => {
        window.location.href = "/signup";
      }}
    />
  );
};

const procress = ["ยืนยันหมายเลขโทรศัพท์", "ตั้งรหัสผ่าน", "เสร็จสิ้น"];

function CreateAccountProcess() {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account_user;
  const [state, setState] = useState(0);

  const nextState = () => {
    if (state == 0) {
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
        return <OtpInput account={account} onNext={nextState} />;
      case 1:
        return <PasswordInput onNext={nextState}  />;
      case 2:
        return <Redirect />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[10px] w-[50vw]">
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
