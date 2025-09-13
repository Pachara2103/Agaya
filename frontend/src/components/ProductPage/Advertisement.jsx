import { useState } from "react";

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    class="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const categories = [
  { name: "Woman's Fashion", hasSubmenu: true },
  { name: "Men's Fashion", hasSubmenu: true },
  { name: "Electronics", hasSubmenu: false },
  { name: "Home & Lifestyle", hasSubmenu: false },
  { name: "Medicine", hasSubmenu: false },
  { name: "Sports & Outdoor", hasSubmenu: false },
  { name: "Baby's & Toys", hasSubmenu: false },
  { name: "Groceries & Pets", hasSubmenu: false },
  { name: "Health & Beauty", hasSubmenu: false },
];

const AdsImg = ["https://i.postimg.cc/SK0WBzLd/Frame-560.png"];

const Advertisement = () => {
  const [index, setIndex] = useState(0);
  const changeIndex = (index) => {
    setIndex(index);
    console.log(index);
  };
  return (
    <div class="flex justify-center items-center ">
      <aside class="flex flex-row">
        <ul class="space-y-5 p-10 w-70">
          {categories.map((category, index) => (
            <li
              key={index}
              class="flex justify-between items-center text-gray-800"
            >
              <a
                href="#"
                class="hover:text-black font-medium transition-colors"
              >
                {category.name}
              </a>
              {category.hasSubmenu && <ChevronRightIcon />}
            </li>
          ))}
        </ul>

        <div class="border-r-2 border-[#c9c9c9] "></div>
      </aside>

      <main class="w-full h-full p-10">
        <div class="relative bg-black text-white h-[384px] rounded-lg overflow-hidden">
          <img
            src={AdsImg[index]}
            class="absolute right-0 bottom-0 h-full w-auto object-center object-contain"
          />

          <div class="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 flex-row">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  onClick={() => changeIndex(i)}
                  class={
                    index === i
                      ? "w-3 h-3 bg-white rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-black ring-white"
                      : "w-3 h-3 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-400"
                  }
                ></span>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Advertisement;
