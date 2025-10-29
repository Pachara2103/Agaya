const Footer = () => {
  return (
    <footer class="bg-black text-gray-300 w-full">
      <div class="mx-auto py-8 px-8">

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* Column 1*/}
          <div class="col-span-1 ">
            <h2 class="text-2xl font-bold text-white mb-3">Agaya</h2>
            <p class="text-white">สมัครสมาชิก</p>
            <p class="text-[12px] pt-2">รับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรกของคุณ</p>
          </div>

          {/* Column 2*/}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">ฝ่ายสนับสนุน</h3>
            <div class="text-sm">
              <p>254 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</p>
              <p class="py-3">agaya@gmail.com</p>
              <p>+660123456789</p>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">บัญชี</h3>
            <ul class="space-y-3 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">บัญชีของฉัน</a></li>
              <li><a href="#" class="hover:text-white transition-colors">เข้าสู่ระบบ / สมัครสมาชิก</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ตะกร้าสินค้า</a></li>
              <li><a href="#" class="hover:text-white transition-colors">รายการสินค้าที่อยากได้</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ช้อปปิ้ง</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">ข้อกำหนด</h3>
            <ul class="space-y-3 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ข้อกำหนดในการใช้งาน</a></li>
              <li><a href="#" class="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ติดต่อ</a></li>
            </ul>
          </div>

        </div>

        <div class="text-center text-gray-500 pt-10 mt-10 border-t border-gray-700 text-sm ">
          <p>© Copyright Agaya 2025. All right reserved</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
