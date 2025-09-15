import { LuShoppingBag } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoStorefrontOutline } from "react-icons/io5";
import { PieChart } from "@mui/x-charts/PieChart";

const box1 =
  "flex flex-col items-center justify-center gap-5 w-40 h-50 font-[600] border-1 rounded-[6px] border-gray-300 shadow-[0_0_4px_1px_rgba(221,221,221,0.7)]";
const boxStyle1 = (icon, text, number) => {
  return (
    <div className={`${box1}`}>
      {icon}
      <div>{text}</div>
      <div>{number}</div>
    </div>
  );
};

function DashboardPage() {
  // #64a8e8ff

  const numberOfUsers = 75;
  const numberOfVendors = 25;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Admin Dashboard
      </div>
      <div className="flex h-130 bg-white justify-center">
        {" "}
        {/* block */}
        <div className="flex-1 my-6 mx-6 bg-white text-black">
          <div className="flex justify-center gap-5 mt-10">
            {boxStyle1(<FaRegUser size={50} />, " จำนวนผู้ใช้", 75)}
            {boxStyle1(<LuShoppingBag size={50} />, " จำนวนสินค้า", 30)}
            {boxStyle1(<LiaShippingFastSolid size={50} />, " จำนวนรายการ", 10)}
            {boxStyle1(<IoStorefrontOutline size={50} />, " จำนวนร้านค้า", 25)}
          </div>
          <div className={`flex justify-center mt-10`}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 75, label: "จำนวนผู้ใช้" },
                    { id: 1, value: 25, label: "จำนวนร้านค้า" },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
