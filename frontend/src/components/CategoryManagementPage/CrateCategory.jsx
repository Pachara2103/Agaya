import React, { useEffect, useState } from "react";

export const CreateCategory = ({ onSuccess }) => {

    const [name, setName] = useState("");

    const createCategory = async () =>{
        try {
            const response = await fetch("http://localhost:5000/api/v1/Agaya/category", {
                 method: "POST",
                 headers: {
                 "Content-Type": "application/json",
                },
                 body: JSON.stringify({category_name: name }), 
            });

            if (!response.ok) {
                throw new Error("Failed to create category");
            }
            const data = await response.json();
            console.log("Category created:", data);
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
        <div className="top-0 left-0 w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-b border-gray-300 flex items-center justify-between px-4 z-50">
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

            {/* Middle content */}
            <div className="absolute left-[45%] justify-center items-center text-black font-title-16px-regular">
                0
            </div>

            {/* Right content */}
            <div className="h-[50px] top-[11px] items-center gap-4">
                <button 
                    onClick={createCategory}
                    className="bg-blue-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center"
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