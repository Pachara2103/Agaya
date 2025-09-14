import "./.css";
import OTPpage from "./OTP";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import Promotion from '../Promotion/Promotion.jsx';
import Nav from '../NavBar/Nav.jsx';

import { FcGoogle } from "react-icons/fc";
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
    if (e.key == "Enter") {
      changState();
    }
  };

  const changState = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    let type = "email";
    let account_user = account;

    if (emailRegex.test(account)) {
    } else if (phoneRegex.test(account)) {
      type = "phone";
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

    if (type == "phone") {
      const num = account.slice(1);
      const part1 = num.slice(0, 2);
      const part2 = num.slice(2, 5);
      const part3 = num.slice(5);
      account_user = `(+66) ${part1} ${part2} ${part3}`;
    }
    navigate(`/signup?step=verify-identity&accountType=${type}`, {
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
    
    <div className="container">
      <Promotion />
      <Nav />

      <main>
        <div className="content">
          {state === "fillUseraccount" && (
            <div className="row">
              <div className="img"></div>

              <div className="register-container">
                <h1 className="title">สมัครใหม่</h1>

                <input
                  type="text"
                  placeholder="อีเมล หรือ เบอร์โทรศัพท์"
                  onChange={fillAccount}
                  onKeyDown={pressEnter}
                  className="input normal"
                />

                {invalid && (
                  <p className="invalid">
                    กรุณาใส่ อีเมล หรือ เบอร์โทรศัพท์ ให้ถูกต้อง
                  </p>
                )}

                <button className="signup-button normal" onClick={changState}>
                  สร้างบัญชีผู้ใช้
                </button>

                <div className="column">
                  <div className="icon">
                    <FaFacebook size={30} color="#0866FF" />
                    <p className="normal">Sign up with Google</p>
                  </div>

                  <div className="icon">
                    <FcGoogle size={30} />
                    <p className="normal">Sign up with Google</p>
                  </div>
                </div>

                <div className="link normal">
                  <p>หากมีบัญชีผู้ใช้แล้ว คุณสามารถ</p>
                  <p className="link-signin" onClick={goToSignin}>
                    เข้าสู่ระบบ
                  </p>
                </div>
              </div>
            </div>
          )}

          {state === "fillOTP" && <OTPpage />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
