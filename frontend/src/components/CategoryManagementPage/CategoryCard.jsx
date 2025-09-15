import React from "react";

export const CategoryCard = ({Category}) => {
  return (
    <div>
        <div className="top-0 left-0 w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-b border-gray-300 flex items-center justify-between px-4 z-50">
            {/* Left content */}
            <div className="flex items-center gap-4 text-black font-title-16px-regular">
                {Category.category_name}
            </div>

            {/* Middle content */}
            <div className="absolute left-[45%] items-center text-black font-title-16px-regular">
                0
            </div>

            {/* Right content */}
            <div className="h-[50px] top-[11px] items-center gap-4">
                <button className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block ml-4">
                    Delete
                </button>
            </div>
        </div>
    </div>
    
    /////
    
  );
};
export default CategoryCard;