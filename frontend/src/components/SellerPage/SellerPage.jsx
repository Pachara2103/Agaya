import { useState } from "react";
import DashBoard from "./DashBoard";
import Sidebar from "./SideBar";
import MyProductsPage from "./MyProductsPage";

const icon = {
  dashboard: 0,
  สินค้าของฉัน: 1,
};

function SellerPage() {
  const [shopname, setShopName] = useState(null);
  const [pageSelected, setPageSelected] = useState("dashboard");

  const userClick = () => {
    switch (icon[pageSelected]) {
      case 0:
        return <DashBoard />;
      case 1:
        return <MyProductsPage />

      default:
        return null;
    }
  };
  return (
    <div className="flex bg-white font-sans">
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-10 py-3 border-b shadow-blue-2">
          <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={()=>{setPageSelected("dashboard")}}>
            Agaya{" "}
            <span className="font-normal text-gray-500">Seller Centre</span>
          </h1>
          <div className="flex items-center space-x-2 border rounded-full p-1 pr-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src="https://i.postimg.cc/br0yv892/user-1.png"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-700">ชื่อร้านค้า</span>
          </div>
        </header>

        <div className="flex-1 flex flex-row">
          <Sidebar setPageSelected={setPageSelected} pageSelected={pageSelected}/>

          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto ">
            {userClick()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
