const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const InstagramIcon = () => (
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.11a1.423 1.423 0 00-1.422-1.422 1.423 1.423 0 001.422 1.422z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
);


const Footer = () => {
  return (
    <footer class="bg-black text-gray-300 w-full">
      <div class="mx-auto py-8 px-8"> 
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Agaya & Newsletter */}
          <div class="col-span-1 ">
            <h2 class="text-2xl font-bold text-white mb-3">Agaya</h2>
            <p class="text-white">สมัครสมาชิก</p>
            <p class="text-[12px] pt-2">รับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรกของคุณ</p>
            
            <form class="flex border border-white rounded-md mt-6" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="กรอกอีเมลของคุณ" 
                class="bg-transparent w-full p-2 focus:outline-none placeholder-gray-500 text-sm"
              />
              <button type="submit" class="" aria-label="Subscribe">
                <SendIcon />
              </button>
            </form>

            

          </div>

          {/* Column 2: Support */}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">ฝ่ายสนับสนุน</h3>
            <div class="text-sm">
                <p>254 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</p>
                <p class="py-3">agaya@gmail.com</p>
                <p>+660123456789</p>
            </div>
          </div>
          
          {/* Column 3: Account */}
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
          
          {/* Column 4: Quick Links */}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">ลิงก์ด่วน</h3>
            <ul class="space-y-3 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ข้อกำหนดในการใช้งาน</a></li>
              <li><a href="#" class="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
              <li><a href="#" class="hover:text-white transition-colors">ติดต่อ</a></li>
            </ul>
          </div>

          {/* Column 5: Download App */}
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Download App</h3>
            <p class="text-xs pb-4">Save $3 with App New User Only</p>
            <div class="flex gap-4 items-center mb-4">
              {/* หมายเหตุ: คุณต้องแทนที่ src ด้วย path ของรูปภาพจริง */}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="QR Code" class="w-20 h-20 bg-white p-1 rounded" />
              <div class="flex flex-col space-y-2">
                <a href="#" aria-label="Get it on Google Play">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play" class="h-9" />
                </a>
                <a href="#" aria-label="Download on the App Store">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" class="h-9" />
                </a>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <a href="#" aria-label="Facebook" class="hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter" class="hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" aria-label="Instagram" class="hover:text-white transition-colors"><InstagramIcon /></a>
              <a href="#" aria-label="LinkedIn" class="hover:text-white transition-colors"><LinkedInIcon /></a>
            </div>
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
