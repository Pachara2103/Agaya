import { useEffect, useState } from "react";
import "./.css";
import OtpInput from "./OtpInput.jsx";
import PasswordInput from "./PasswordInput.jsx";
import EmailInput from "./EmailInput.jsx";
import { useNavigate } from "react-router-dom";

import { FaCircleCheck } from "react-icons/fa6";

const Done = ({ countdown }) => {
  const navigate = useNavigate();
  return (
    <div className="otp-input-box">
      <div className="relative flex flex-col justify-between  text-[#000] gap-2  p-5 w-full h-full text-center">
        <h1 className="text-[18px] font-bold pt-2">ตั้งรหัสผ่านใหม่สำเร็จ</h1>

        <FaCircleCheck size={45} color="#00FF66" class="ml-40" />

        <p class="">เปลี่ยนรหัสผ่านบัญชีนี้สำเร็จ</p>
        <p class="">คุณจะย้ายไปยังหน้าเข้าสู่ระบบภายใน {countdown} วินาที</p>

        <button className="button1" onClick={() => navigate("/signin")}>ตกลง</button>
      </div>
    </div>
  );
};

const PasswordRecovery = ({}) => {
  const [state, setState] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // countdown when success //
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (state !== 3) return;
    if (countdown <= 0) {
      navigate("/signin");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, state, navigate]);

  // countdown when success //

  const nextState = (email) => {
    if (email) {
      setEmail(email);
    }
    setState((prevState) => prevState + 1);

    if (state == 0) {
      navigate(`/password-recovery?step=verify-otp`);
    }
    if (state == 1) {
      navigate("/password-recovery?step=done");
    } else {
      return;
    }
  };

  const backToSignin = () => {
    navigate("/signin");
    return;
  };

  const renderStepContent = () => {
    switch (state) {
      case 0:
        return <EmailInput onNext={nextState} onBack={backToSignin} />;

      case 1:
        return (
          <OtpInput account={email} onNext={nextState} onBack={backToSignin} />
        );

      case 2:
        return (
          <PasswordInput
            account={email}
            onNext={nextState}
            onBack={backToSignin}
            details="ตั้งรหัสผ่านใหม่"
            type="forgetpassword"
          />
        );
      case 3:
        return <Done countdown={countdown} />;
      default:
        return null;
    }
  };

  return (
    <div class="flex w-screen h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[10px] w-[50vw]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PasswordRecovery;
