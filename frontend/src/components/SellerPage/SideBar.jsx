function SideBar({ setPageSelected, pageSelected, display }) {
  return (
    <aside>
      {display && (
        <div className="w-64 bg-gray-50 text-gray-600 p-6 flex-shrink-0">
          <nav className="space-y-9">
            <div>
              <h3 className="font-semibold text-gray-800">คำสั่งซื้อ</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    คำสั่งซื้อของฉัน
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    ขอยกเลิก/คืนเงิน/คืนสินค้า
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    ตั้งค่าการจัดส่ง
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">สินค้า</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="#สินค้าของฉัน"
                    className={
                      pageSelected == "สินค้าของฉัน"
                        ? "text-[#b71f3b]"
                        : "hover:text-gray-900"
                    }
                    onClick={() => setPageSelected("สินค้าของฉัน")}
                  >
                    สินค้าของฉัน
                  </a>
                </li>
                <li>
                  <a
                    href="#เพิ่มสินค้าใหม่"
                    className={
                      pageSelected == "เพิ่มสินค้าใหม่"
                        ? "text-[#b71f3b]"
                        : "hover:text-gray-900"
                    }
                    onClick={() => setPageSelected("เพิ่มสินค้าใหม่")}
                  >
                    เพิ่มสินค้าใหม่
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">การบริการลูกค้า</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    จัดการแชท
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    จัดการรีวิว
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">สินค้า</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    รายรับของฉัน
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Seller Balance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    บัญชีธนาคาร
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">ร้านค้า</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    รายละเอียดร้านค้า
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    การตกแต่งหน้าร้าน
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    ตั้งค่าหน้าร้านค้า
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
