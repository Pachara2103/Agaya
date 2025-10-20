import {
  FaBoxOpen,
  FaShoppingCart,
  FaPlusSquare,
  FaStore,
  FaChartLine,
  FaCog,
  FaHeadset,
} from "react-icons/fa";

const MenuItem = ({ text, isSelected, onClick }) => (
  <li>
    <a
      href="#"
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-lg ${
        isSelected
          ? "bg-red-50 text-red-700 font-semibold"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      {text}
    </a>
  </li>
);

function SideBar({ setPageSelected, pageSelected, display }) {
  if (!display) {
    return null;
  }

  return (
    <aside className="w-[325px] bg-[#F7F7F7] p-5 border-r border-gray-200 flex-shrink-0">
      <nav>
        <div>
          <h3 className="px-3 text-base font-bold text-gray-800">คำสั่งซื้อ</h3>
          <ul className="mt-2 space-y-1">
            <MenuItem
              text="คำสั่งซื้อของฉัน"
              isSelected={pageSelected === "คำสั่งซื้อของฉัน"}
              onClick={() => setPageSelected("คำสั่งซื้อของฉัน")}
            />
            <MenuItem
              text="ขอยกเลิก/คืนเงิน/คืนสินค้า"
              isSelected={pageSelected === "ขอยกเลิก/คืนเงิน/คืนสินค้า"}
              onClick={() => setPageSelected("ขอยกเลิก/คืนเงิน/คืนสินค้า")}
            />
            <MenuItem
              text="ตั้งค่าการจัดส่ง"
              isSelected={pageSelected === "ตั้งค่าการจัดส่ง"}
              onClick={() => setPageSelected("ตั้งค่าการจัดส่ง")}
            />
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-base font-bold text-gray-800">สินค้า</h3>
          <ul className="mt-2 space-y-1">
            <MenuItem
              text="สินค้าของฉัน"
              isSelected={pageSelected === "สินค้าของฉัน"}
              onClick={() => setPageSelected("สินค้าของฉัน")}
            />
            <MenuItem
              text="เพิ่มสินค้าใหม่"
              isSelected={pageSelected === "เพิ่มสินค้าใหม่"}
              onClick={() => setPageSelected("เพิ่มสินค้าใหม่")}
            />
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-base font-bold text-gray-800">
            การบริการลูกค้า
          </h3>
          <ul className="mt-2 space-y-1">
            <MenuItem text="จัดการแชท" />
            <MenuItem text="จัดการรีวิว" />
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-base font-bold text-gray-800">การเงิน</h3>
          <ul className="mt-2 space-y-1">
            <MenuItem text="รายรับของฉัน" />
            <MenuItem text="Seller Balance" />
            <MenuItem text="บัญชีธนาคาร" />
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-base font-bold text-gray-800">ร้านค้า</h3>
          <ul className="mt-2 space-y-1">
            <MenuItem text="รายละเอียดร้านค้า" />
            <MenuItem text="การตกแต่งหน้าร้าน" />
            <MenuItem text="ตั้งค่าหน้าร้านค้า" />
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default SideBar;
