import CreateAccountProcess from "./CreateAccountProcess";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import Promotion from '../Promotion/Promotion.jsx';
import Nav from '../NavBar/Nav.jsx';

import { FcGoogle } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";

function Signup() {
  const [state, setState] = useState("fillUseraccount");
  const [account, setAccount] = useState("");
  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();
  const goToSignin = () => {
    navigate("/signin");
  };

  const fillAccount = (e) => {
    setAccount(e.target.value);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      changState();
    }
  };

  const changState = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let account_user = account;

    if (emailRegex.test(account)) {
    } else {
      setInvalid(true);
      return;
    }
    if (state === "fillUseraccount") {
      setState("fillOTP");
    } else if (state === "fillOTP") {
      setState("fillPassword");
    } else {
      setState("fillUseraccount");
    }

    navigate(`/signup?step=verify-identity`, {
      state: { account_user },
    });
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 5000);
    }
  }, [invalid]);

  return (
    <div className="flex flex-col relative min-h-screen overflow-x-hidden">
      <Promotion />
      <Nav />
      <main>
        <div className="flex flex-row justify-center items-center h-[75vh] w-full px-[10vw] pr-[12vw] box-border">
          {state === "fillUseraccount" && (
            <div className="flex flex-row items-center justify-center w-full h-full mr-[5vw] gap-10">
              {/* image */}
              <div
                className="w-[40vw] h-[30vw] flex justify-center items-center bg-no-repeat bg-contain bg-center"
                style={{
                  backgroundImage:
                    "url(https://i.postimg.cc/cJWJf2bG/image-64.png)",
                }}
              ></div>

              {/* register form */}
              <div className="flex flex-col justify-center w-[20vw]">
                <h1 className="text-[35px] font-bold text-black mb-4">
                  สมัครใหม่
                </h1>

                <input
                  type="email"
                  placeholder="กรุณาใส่อีเมล"
                  onChange={fillAccount}
                  onKeyDown={pressEnter}
                  className="bg-white h-[45px] border-b border-gray-400 mb-2 px-2 outline-none text-gray-500 focus:text-black"
                />

                {invalid && (
                  <p className="text-red-500 mb-2 text-sm">
                    กรุณาใส่ อีเมล ให้ถูกต้อง
                  </p>
                )}

                <button onClick={changState}>สร้างบัญชีผู้ใช้</button>

                <div className="flex flex-row items-center justify-center gap-3 border border-gray-400 rounded-[3px] py-[8px] cursor-pointer mb-4">
                  <FcGoogle size={30} />
                  <p className="text-[14px] text-gray-800">
                    Sign up with Google
                  </p>
                </div>

                <div className="flex flex-row justify-center gap-2 text-gray-500 text-sm">
                  <p>หากมีบัญชีผู้ใช้แล้ว คุณสามารถ</p>
                  <p
                    className="border-b border-black cursor-pointer text-black"
                    onClick={goToSignin}
                  >
                    เข้าสู่ระบบ
                  </p>
                </div>
              </div>
            </div>
          )}

          {state === "fillOTP" && <CreateAccountProcess />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;
