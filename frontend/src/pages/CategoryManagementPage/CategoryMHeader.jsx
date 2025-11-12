import React from "react";

export const CategoryMHeader = () => {
  return (
    <div>
        <div className="relative w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-1 border-gray-200 flex items-center justify-between px-4 z-50">
            {/* Left content */}
            <div className="flex items-center gap-4 text-black font-title-16px-regular">
                Category
            </div>

            {/* Middle content */}
            <div className="absolute left-[265px] items-center text-black font-title-16px-regular">
                Total Product
            </div>

            {/* Right content */}
            <div className="flex items-center gap-4 text-black font-title-16px-regular">
                Action
            </div>
        </div>
    </div>
    
    /////
    
  );
};
export default CategoryMHeader;