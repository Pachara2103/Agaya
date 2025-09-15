import React, { useEffect, useState } from "react";
import { editCategory, deleteCategory } from "../../libs/categoryService";

export const CategoryCard = ({Category, onSuccess}) => {

    const [isEditing, setIsEditing] = useState(false); // track edit mode
    const [name, setName] = useState(Category.category_name);
    const [isDelete, setisDelete] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setName(Category.category_name); // reset to original
        setIsEditing(false);
        setisDelete(false);
    };

    const handleConfirm = async({ mode }) => { //mode 1 is editing, mode 2 is deleting 
        if(mode == 1){
            try {
                const response = await editCategory("http://localhost:5000/api/v1/Agaya", Category._id, {category_name: name });
                console.log("Category edited:", response);
                alert("Category edited successfully!");
                if (onSuccess) onSuccess();
            } catch (error) {
                console.error("Error:", error);
                alert("Error Editing category");
            }
        }  
        else {
             try {
                const response = await deleteCategory("http://localhost:5000/api/v1/Agaya", Category._id);
                console.log("Category deleted:", response);
                alert("Category deleted successfully!");
                if (onSuccess) onSuccess();
            } catch (error) {
                console.error("Error:", error);
                alert("Error Delete category");
            }
        }
        setIsEditing(false);
        setisDelete(false);
    };

    const handleDelete = () => {
        setisDelete(true);
    };


  return (
    <div>
        <div className="top-0 left-0 w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-b border-gray-300 flex items-center justify-between px-4 z-50">
            {/* Left content */}
            <div className="flex items-center gap-4 text-black font-title-16px-regular">
                 {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ):(
                    Category.category_name
                )}
            </div>

            {/* Middle content */}
            <div className="absolute left-[45%] items-center text-black font-title-16px-regular">
                0
            </div>

            {/* Right content */}
            <div className="h-[50px] top-[11px] items-center gap-4">
                {(isEditing || isDelete)? (
                    <>
                        <button 
                            onClick={() => handleConfirm({mode : isEditing ? 1 : 2})}
                            className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block"
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block ml-4"
                        >
                            Cancel
                        </button>
                    </>
                ):(
                     <>
                        <button 
                            onClick={handleEdit}
                            className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-6 h-full min-w-[100px] rounded flex items-center justify-center inline-block ml-4"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
    
    /////
    
  );
};
export default CategoryCard;