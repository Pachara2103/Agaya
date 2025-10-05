const category = [
  "Phones",
  "Computers",
  "SmartWatch",
  "Camera",
  "HeadPhones",
  "Gaming",
];
const categoryImg = [
  "https://i.postimg.cc/sghdgpph/Category-Cell-Phone.png",
  "https://i.postimg.cc/d1WSB12F/Category-Computer.png",
  "https://i.postimg.cc/8cjXnS46/Category-Smart-Watch.png",
  "https://i.postimg.cc/wMZfCG4b/Category-Camera.png",
  "https://i.postimg.cc/y6bb3D6X/Category-Headphone.png",
  "https://i.postimg.cc/Dy4Yr78V/Category-Gamepad.png",
];

const Category = () => {
  return (
    // grid: เปิดใช้งาน Grid
    // grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4: กำหนดจำนวนคอลัมน์ตามขนาดหน้าจอ (Responsive)

    <div class="flex flex-row items-center justify-center gap-15">
      {category.map((c, index) => (
        <div class="aspect-square flex-shrink-0 w-35 border-2 border-[#C9C9C9] flex flex-col items-center justify-center">
          <img src={categoryImg[index]} class="w-12" />
          <span class="text-[#000] text-l">{c}</span>
        </div>
      ))}
    </div>
  );
};

const CategoryAndTitle = ({ title, details }) => {
  return (
    <div class="flex flex-col gap-5 w-full ">
      <div class="flex flex-row gap-5 h-8 items-center">
        <div class="w-4 h-full rounded-[4px] bg-[#DB4444]"></div>
        <p class="text-[14px] font-bold text-[#000]">{title}</p>
      </div>

      <div class="flex gap-5 h-8 items-center">
        <span class="text-3xl text-[#000] font-bold">{details}</span>
      </div>

      <div class="mx-5 my-2 w-full flex flex-row gap-15 overflow-x-auto items-start hide-scrollbar border-l-gray-100 border-r-gray-100  border-2">
        <Category />
      </div>
    </div>
  );
};

export default CategoryAndTitle;
