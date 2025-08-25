import "./footer.css";

function Footer() {
  return (
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
  );
}

export default Footer;
