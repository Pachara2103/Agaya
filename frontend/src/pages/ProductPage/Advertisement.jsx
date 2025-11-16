import { useState } from "react";

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
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

const AdsImg = [
  "https://i.postimg.cc/SK0WBzLd/Frame-560.png",
  "https://i.postimg.cc/V6N5vHvL/4e3ed1555d1c546f923e3aba24083f3d.jpg",
  "https://i.postimg.cc/TPtYzq08/b5626b9b25e5f59949beab342db47c85.jpg",
  "https://i.postimg.cc/c4f3V28V/72e20befbffe6df0a734648e8d02ac00.jpg",
  "https://i.postimg.cc/nz7VXbZx/ef6769403bb7a67768a1dea51ca130ea.jpg"

];

const Advertisement = () => {
  const [index, setIndex] = useState(0);
  const changeIndex = (index) => {
    setIndex(index);
    console.log(index);
  };
  return (
    <div className="flex justify-center items-center ">
      <aside className="flex flex-row">
        <ul className="space-y-5 p-10 w-70">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-gray-800"
            >
              <a
                href="#"
                className="hover:text-black font-medium transition-colors"
              >
                {category.name}
              </a>
              {category.hasSubmenu && <ChevronRightIcon />}
            </li>
          ))}
        </ul>

        <div className="border-r-2 border-[#c9c9c9] "></div>
      </aside>

      <main className="w-full h-full min-w-[700px]  p-10  flex items-center justify-center">
        <div className="aspect-video relative text-white h-[384px] w-200 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={AdsImg[index]}
            className=""
          />

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 flex-row">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  onClick={() => changeIndex(i)}
                  className={
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
