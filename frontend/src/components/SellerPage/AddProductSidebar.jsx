const AddProductSidebar = () => {
  const steps = [
    "เพิ่มรูปภาพสินค้า",
    "ตั้งชื่อสินค้าความยาวไม่เกิน 255 ตัวอักษร",
    "กำหนดหมวดหมู่ของสินค้า",
    "เขียนรายละเอียดของสินค้าความยาวไม่เกิน 200 ตัวอักษร",
    "กำหนดราคาสินค้า",
    "กำหนดจำนวนสินค้าในคลังสินค้า",
  ];

  return (
    <aside className="w-1/4">
      <div className="bg-red-200 text-red-800 font-bold p-4 rounded-t-lg">
        การปรับปรุงที่แนะนำ
      </div>
      <div className="bg-white p-4 rounded-b-lg shadow">
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center">
              <input
                id={`step-${index}`}
                type="radio"
                name="product-step"
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
              />
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