import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./.css";
import { FcGoogle } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

function Signin() {
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

      <footer>
        <div className="footer">
          <ul className="column medium">
            <p className="normal" style={{ fontWeight: "700" }}>
              Agaya
            </p>
            <li>สมัครสมาชิก</li>
            <li>รับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรกของคุณ</li>
          </ul>

          <ul className="column medium">
            <p className="normal">ฝ่ายสนับสนุน</p>
            <li style={{ maxWidth: "250px" }}>
              254 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330
            </li>
            <li>agaya@gmail.com</li>
            <li>+660123456789</li>
          </ul>

          <ul className="column medium">
            <p className="normal">บัญชี</p>
            <li>บัญชีของฉัน</li>
            <li>เข้าสู่ระบบ / สมัครสมาชิก</li>
            <li>ตะกร้าสินค้า</li>
            <li>รายการสินค้าที่อยากได้</li>
            <li>ช้อปปิ้ง</li>
          </ul>

          <ul className="column medium">
            <p className="normal"> ลิงก์ด่วน</p>
            <li>นโยบายความเป็นส่วนตัว</li>
            <li>ข้อกำหนดในการใช้งาน</li>
            <li>คำถามที่พบบ่อย</li>
            <li>ติดต่อ</li>
          </ul>

          <p className="coppyright medium">
            Copyright Agaya 2025. All right reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Signin;
