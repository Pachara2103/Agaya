import { useEffect, useState } from "react";

const AddProductSidebar = ({
  img,
  name,
  category,
  description,
  price,
  stock,
}) => {
  const steps = [
    "เพิ่มรูปภาพสินค้า",
    "ตั้งชื่อสินค้าความยาวไม่เกิน 255 ตัวอักษร",
    "กำหนดหมวดหมู่ของสินค้า",
    "เขียนรายละเอียดของสินค้าความยาวไม่เกิน 200 ตัวอักษร",
    "กำหนดราคาสินค้า",
    "กำหนดจำนวนสินค้าในคลังสินค้า",
  ];
  const [check, setCheck] = useState(Array(6).fill(false));
  useEffect(() => {
    const conditions = { img, name, category, description, price, stock };

    setCheck((prev) => {
      const newValue = [...prev];
      Object.entries(conditions).forEach(([key, value], index) => {
        if (value) newValue[index] = true;
        else newValue[index] = false;
      });
      return newValue;
    });
  }, [img, name, category, description, price, stock]);

  return (
    <aside className="w-1/4">
      <div className="bg-red-200 text-red-800 font-bold p-4 rounded-t-lg">
        การปรับปรุงที่แนะนำ
      </div>
      <div className="bg-white p-4 rounded-b-lg shadow">
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-row items-center">
              {check[index] && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7ED079] border-3 border-[#287124]"></span>
              )}
              {!check[index] && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border-3 border-[#C9C9C9]"></span>
              )}

              <label
                htmlFor={`step-${index}`}
                className="ml-3 text-sm text-gray-700"
              >
                {step}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AddProductSidebar;
