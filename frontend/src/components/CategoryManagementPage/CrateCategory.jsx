import React, { useEffect, useState } from "react";
import { createCategory } from "../../libs/categoryService";

export const CreateCategory = ({ onSuccess }) => {

    const [name, setName] = useState("");

    const addCategory = async () =>{
        try {

            const response = await createCategory({categoryName: name});
            console.log("Category created:", response);
            alert("Category created successfully!");
            if (onSuccess) onSuccess();
            setName("");
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating category");
        }
    } 

  return (
    <div>
        <div className="top-0 left-0 w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-1 border-gray-200 flex items-center justify-between px-4 z-50">
            {/* Left content */}
            <div className="flex items-center gap-4 text-black font-title-16px-regular">
                <input 
                    type="text"
                    id="name"
                    placeholder="Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Middle content 
            <div className="absolute left-[45%] justify-center items-center text-black font-title-16px-regular">
                0
            </div>*/}

            {/* Right content */}
            <div className="h-[42px] top-[15px] items-center gap-4">
                <button 
                    onClick={addCategory}
                    className="bg-blue-500 text-white px-6 h-full min-w-[100px] flex items-center justify-center"
                >
                    Create
                </button>
            </div>
        </div>
    </div>
    
    /////
    
  );
};
export default CreateCategory;