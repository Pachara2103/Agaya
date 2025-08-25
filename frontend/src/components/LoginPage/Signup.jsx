import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./.css";
import { FcGoogle } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import Footer from '../Footer/Footer';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToSignin = () => {
    navigate("/signin");
  };

  const fillEmail = (e) => {
    setEmail(e.target.value);
  };
  const fillPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="promotion small">
        <label>
          โปรโมชันพิเศษรับซัมเมอร์! ชุดว่ายน้ำลด 50% ทุกแบบ
          พร้อมส่งฟรีแบบด่วนพิเศษ!
        </label>
        <p style={{ fontWeight: "800" }}>ช็อปเลย!</p>
      </div>

      <nav>
        <div className="header">
          <h2 className="big" style={{ color: "#000000" }}>
            Agaya
          </h2>

          <ul className="nav medium">
            <li>เปิดร้านค้าใหม่</li>
            <li>ช่วยเหลือ</li>
            <li>สมัครใหม่</li>
            <li>เข้าสู่ระบบ</li>
          </ul>

          <div className="search-box small">
            <input type="text" placeholder="ค้นหาสินค้าและร้านค้า" />
            <CiSearch size={22} />
          </div>
        </div>
      </nav>

      <main>
        <div className="content">
          <div className="img-box">
            <div className="img"></div>
          </div>

          <div className="signin-container">
            <div className="column-box">
              <h1 className="title">สมัครใหม่</h1>

              <input
                type="text"
                placeholder="อีเมลล์ หรือ เบอร์โทรศัพท์"
                onChange={fillEmail}
                className="input normal"
              />
              <input
                type="text"
                placeholder="รหัสผ่าน"
                onChange={fillPassword}
                className="input normal"
              />

              <button className="signup-button normal">สร้างบัญชีผู้ใช้</button>

              <div className="google">
                <FcGoogle size={30} />
                <p className="normal">Sign up with Google</p>
              </div>

              <div className="link normal">
                <p>หากมีบัญชีผู้ใช้แล้ว คุณสามารถ</p>
                <p
                  style={{
                    borderBottom: "solid 1px #000000",
                    cursor: "pointer",
                  }}

                  onClick={goToSignin}
                >
                  เข้าสู่ระบบ
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    

    </div>
  );
}

export default Signup;
