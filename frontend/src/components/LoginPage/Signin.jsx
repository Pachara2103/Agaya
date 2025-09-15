import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { Login } from "../../libs/authService.js";
import Cookies from 'js-cookie'; 

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aleart, setAleart] = useState("อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง");
  const [invalid, setInvalid] = useState(false);
  
  const navigate = useNavigate();

  const fillEmail = (e) => {
    setEmail(e.target.value);
  };
  const fillPassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    if (!email || !password) {
      setInvalid(true);
      setAleart("กรุณาใส่ข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const data = await Login(email, password);
      
      if (data.success && data.token) {
        console.log("Login success, saving token...");

        Cookies.set('token', data.token, { 
          expires: 7, 
          secure: true, 
          sameSite: 'strict' 
        });

        navigate("/"); 
      } else {
        throw new Error(data.message || "อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง");
      }
    } catch (err) {
      console.log("Login error:", err.message);
      setInvalid(true);
      setAleart("อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง");
    }
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 5000);
    }
  }, [invalid]);



  const goToForgetPasswordPage = () => {
    navigate("/password-recovery");
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main>
        <div className="flex flex-row justify-center items-center h-[75vh] w-full px-[10vw] pr-[12vw] box-border">
          <div className="flex flex-row items-center justify-center w-full h-full mr-[5vw] gap-10">
            <div
              className="w-[40vw] h-[30vw] flex justify-center items-center bg-no-repeat bg-contain bg-center"
              style={{
                backgroundImage:
                  "url(https://i.postimg.cc/cJWJf2bG/image-64.png)",
              }}
            ></div>

            <div className="flex flex-col justify-center w-[20vw] relative">
              <h1 className="text-[35px] font-bold text-black mb-4">
                เข้าสู่ระบบ
              </h1>

              <input
                type="email"
                placeholder="อีเมล"
                onChange={fillEmail}
                className="bg-white h-[45px] border-b border-gray-400 mb-2 px-2 outline-none text-gray-500 focus:text-black"
              />

              <input
                type="password"
                placeholder="รหัสผ่าน"
                onChange={fillPassword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    login();
                  }
                }}
                className="bg-white h-[45px] border-b border-gray-400 mb-8 px-2 outline-none text-gray-500 focus:text-black"
              />

              {invalid && (
                <p className="text-red-500 mb-2 text-sm absolute bottom-35.5">
                  {aleart}
                </p>
              )}

              <button onClick={login}>เข้าสู่ระบบ</button>

              <div className="flex flex-row items-center justify-center gap-3 border border-gray-400 rounded-[3px] py-[8px] cursor-pointer mb-4">
                <FcGoogle size={30} />
                <p className="text-[14px] text-gray-800">Sign up with Google</p>
              </div>

              <div className="flex justify-start items-center text-gray-500 text-sm">
                <span class="text-[#1E5294] cursor-pointer" onClick={goToForgetPasswordPage}>ลืมรหัสผ่าน</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signin;
