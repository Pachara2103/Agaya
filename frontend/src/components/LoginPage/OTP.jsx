import "./otp.css";
import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ArrowLeft from "../../assets/arrow-left.png";
import { FaCheck } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

import moduleName from 'module';

function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { accountType } = useParams()
  // useParams() ใช้กับ path parameter เท่านั้น เช่น /signup/:accountType

  const searchParams = new URLSearchParams(location.search);
  const accountType = searchParams.get("accountType");
  const account = location.state?.account_user;

  const [state, setState] = useState(0);
  const [OTP, setOTP] = useState(Array(6).fill(""));
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [count, setCount] = useState(5);

  const [format1, setFormat1] = useState(true);
  const [format2, setFormat2] = useState(false);
  const [format3, setFormat3] = useState(false);
  const [format4, setFormat4] = useState(false);
  const [disableOTP, setDisableOTP] = useState(true); //otp button
  const [disable, setDisable] = useState(false); //button

  const formatText = [
    { text: "ตัวพิมพ์เล็ก อย่างน้อย 1 ตัว (a-z)", display: format1 },
    { text: "ตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว (A-Z)", display: format2 },
    { text: "ตัวเลข อย่างน้อย 1 ตัว (0-9)", display: format3 },
    { text: "ความยาวเกิน 8 ตัวอักษร", display: format4 },
  ];

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

  useEffect(() => {
    if (state == 2) {
      if (count <= 0) {
        navigate("/");
        return;
      }
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state, count]);

  useEffect(() => {
    if (OTP.join("").length == 6) {
      setDisableOTP(false);
    } else {
      setDisableOTP(true);
    }
  }, [OTP]);

  // api //

  // api //

  const nextState = () => {
    if (state == 0 && OTP.join("").length == 6) {
      // if ("รหัส otp ผิด") {
      //   setInvalidOTP(true);
      //   setTimeout(() => {
      //     setInvalidOTP(false);
      //   }, 5000);
      // }
      setState(state + 1);
      navigate("/signup?step=set-password");
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

  const fillPassword = (e) => {
    setPassword(e.target.value);
  };
  const fillOTP = (e) => {
    setOTP(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    if (e.key == "Enter" && OTP.join("").length == 6) {
      nextState();
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-row">
        <div className="otp-focus">
          <div className="circle">
            <p className="big">1</p>
          </div>

          <p className="small">ยืนยันหมายเลขโทรศัพท์</p>
        </div>

        <HiArrowLongRight size={50} color={state > 0 ? "#35e421" : "#c9c9c9"} />

        <div className={state > 0 ? "otp-focus" : "otp-nfocus"}>
          <div className="circle">
            <p className="big">2</p>
          </div>
          <p className="small">ตั้งรหัสผ่าน</p>
        </div>

        <HiArrowLongRight size={50} color={state > 1 ? "#35e421" : "#c9c9c9"} />

        <div className={state > 1 ? "otp-focus" : "otp-nfocus"}>
          <div className="circle">
            <FaCheck size={20} color={state > 1 ? "" : "#C9C9C9"} />
          </div>
          <p className="small">เสร็จสิ้น</p>
        </div>
      </div>

      {state === 0 && (
        <div className="otp-input-box">
          <section des="title">
            <div className="title">
              <img
                src={ArrowLeft}
                className="back-button"
                onClick={backToSignup}
              />
              <h1 className="big">กรอกรหัสยืนยันตัวตน</h1>

              <div className="box medium">
                <p>
                  รหัสยืนยันตัวตนจะถูกส่งไปยัง{" "}
                  {accountType === "email" ? "Email ที่" : "SMS ที่"}
                </p>
                <p>{account}</p>
              </div>
            </div>
          </section>

          <div className="row">
            {invalidOTP && (
              <p className="invalid">กรุณาใส่รหัส OTP ให้ถูกต้อง</p>
            )}
            {OTP.map((digit, i) => (
              <input
                type="text"
                key={i}
                inputMode="numeric"
                pattern="[0-9]*"
                className="otp-input big"
                maxLength={1}
                value={digit}
                onChange={(e) => fillOTPInput(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>

          <div className="resend small">
            <p>ไม่ได้รับรหัส ?</p>
            <div className="row-link">
              <p className="link">ส่งอีกครั้ง</p>
              <p>หรือลองใช้</p>
              <p className="link">วิธีอื่น</p>
            </div>
          </div>

          <button
            className={disableOTP ? "button-disable normal" : "button normal"}
            disabled={disableOTP}
            onClick={nextState}
          >
            ถัดไป
          </button>
        </div>
      )}

      {state === 1 && (
        <div className="otp-input-box">
          <section des="title">
            <div className="title">
              <img
                src={ArrowLeft}
                className="back-button"
                onClick={backToSignup}
              />
              <h1 className="big">ตั้งรหัสผ่าน</h1>
              <p className="medium box">
                คุณมาถึงขั้นตอนสุดท้ายแล้ว กรุณาตั้งรหัสผ่าน
              </p>
            </div>
          </section>

          <div className="format medium">
            <div className="row-password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                className="password-input"
                onChange={fillPassword}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    nextState();
                  }
                }}
              />

              {showPassword && (
                <FaRegEye
                  onClick={toggleShowPassword}
                  className="showpassword"
                  size={20}
                  color="#000"
                />
              )}
              {!showPassword && (
                <FaRegEyeSlash
                  className="showpassword"
                  onClick={toggleShowPassword}
                  size={20}
                  color="#000"
                />
              )}
            </div>

            {formatText.map((item, index) => (
              <div className="row" key={index}>
                <li className={item.display ? "available" : "unavailable"}>
                  {item.text}
                </li>
                {item.display && (
                  <IoCheckmarkCircle color="#35E401" size={15} />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={nextState}
            className={disable ? "button-disable normal" : "button normal"}
            disabled={disable}
          >
            สมัครใหม่
          </button>
        </div>
      )}

      {state === 2 && (
        <div className="otp-input-box">
          <section des="title">
            <div className="title">
              <img src={ArrowLeft} className="back-button" disable={true} />
              <h1 className="big">สมัครสมาชิกเสร็จสิ้น</h1>
            </div>
          </section>

          <div className="redirect normal">
            <p>ระบบจะนำท่านเข้าสู่ หน้าหลักในอีก {count} วินาที...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTP;
