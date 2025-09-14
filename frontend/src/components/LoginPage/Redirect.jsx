import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./CreateAccountProcess";
import "./.css";



const Redirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="otp-input-box">
      <div className="relative flex flex-col justify-center items-center text-[#000] gap-2 mt-3">
        <BackButton />
        <h1 className="text-[18px] font-bold pt-2">สมัครสมาชิกเสร็จสิ้น</h1>
      </div>

      <div class="flex items-center justify-center text-base h-full pb-10">
        <p>ระบบจะนำท่านเข้าสู่ หน้าหลักในอีก {count} วินาที...</p>
      </div>
    </div>
  );
};

export default Redirect;
