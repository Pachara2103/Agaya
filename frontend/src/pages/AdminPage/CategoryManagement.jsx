import React, { useEffect, useState } from "react";
import CategoryMHeader from "../CategoryManagementPage/CategoryMHeader";
import CategoryCard from "../CategoryManagementPage/CategoryCard";
import CreateCategory from "../CategoryManagementPage/CrateCategory";
import { getCategories } from "../../services/categoryService";

export const CategoryManagement = () => {

    const [category, setcategory] = useState(null);

    const getData = async () => {

        try {
            const categorydata = await getCategories();
            // console.log(categorydata);
            const category = categorydata.data;
            setcategory(category);
        } catch (err) {
            console.log(err);
            throw new Error("Can not get Data");
        }
    }

    useEffect(() => {       
        getData();
    }, []);
    if (!category) return <p>Loading...</p>;
    // console.log("category: ",category);

  return (
      <div className="w-[800px] h-[600px]">
        <div className="relative bg-white shadow-[0px_0px_4px_1px_#0000001a]">
          <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
            Category Management
          </div>

          <img
            className="w-full h-[1px] top-[115px] left-[51px] px-[63px]"
            alt="Line"
            src = "https://i.postimg.cc/ZKYXghDG/black-1.png"
          />
          <div className = "flex-1 my-3 mx-12 bg-white p-1 text-black">
            <CategoryMHeader />
            <div className=" flex flex-col gap-2 mt-6 overflow-y-auto h-100">

              {category.map((cat, index) => (
                  <CategoryCard key={index} Category={cat} onSuccess={getData}/>
              ))}

              <CreateCategory onSuccess={getData}/>
            </div>
          </div>
        </div>
      </div>
  );
};
export default CategoryManagement;