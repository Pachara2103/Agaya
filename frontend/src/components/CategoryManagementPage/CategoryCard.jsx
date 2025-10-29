import { useEffect, useState } from "react";
import { editCategory, deleteCategory, getCategoryQuantity } from "../../libs/categoryService";


export const CategoryCard = ({ Category, onSuccess }) => {

    const [isEditing, setIsEditing] = useState(false); // track edit mode
    const [name, setName] = useState(Category.categoryName);
    const [isDelete, setisDelete] = useState(false);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const getcategoryQuantity = async () => {
            const count = await getCategoryQuantity(Category.categoryName);
            setQuantity(count)
        }
        getcategoryQuantity();
    }, [])

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setName(Category.categoryName); // reset to original
        setIsEditing(false);
        setisDelete(false);
    };

    const handleConfirm = async ({ mode }) => { //mode 1 is editing, mode 2 is deleting 
        if (mode == 1) {
            try {
                const response = await editCategory(Category._id, { categoryName: name });
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
                const response = await deleteCategory(Category._id);
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
            <div className="relative top-0 left-0 w-full h-[72px] bg-white shadow-[0px_0px_4px_1px_#0000001a] rounded-b border-1 border-gray-200 flex items-center justify-between p-4 z-50">
                {/* Left content */}
                <div className="flex items-center gap-4 text-black font-title-16px-regular">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        Category.categoryName
                    )}
                </div>

                {/* Middle content */}
                <div className="absolute left-[300px] text-black font-title-16px-regular">
                    {quantity}
                </div>

                {/* Right content */}
                <div className="h-[42px] top-[15px] items-center gap-4">
                    {(isEditing || isDelete) ? (
                        <>
                            <button
                                onClick={() => handleConfirm({ mode: isEditing ? 1 : 2 })}
                                className="bg-red-500 text-white px-6 h-full min-w-[100px] flex items-center justify-center inline-block cursor-pointer"

                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-6 h-full min-w-[100px] flex items-center justify-center inline-block ml-4 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEdit}
                                className="bg-red-500 text-white px-6 h-full min-w-[100px] flex items-center justify-center inline-block cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="!bg-[#B71F3B] text-white px-6 h-full min-w-[100px] flex items-center justify-center inline-block ml-4 cursor-pointer"
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