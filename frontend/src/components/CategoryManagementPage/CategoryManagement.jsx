import React, { useEffect, useState } from "react";
import CategoryMHeader from "./CategoryMHeader";
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CrateCategory";

export const CategoryManagement = () => {

    const [category, setcategory] = useState(null);

    const getData = async () => {
         try {
            const res = await fetch(`http://localhost:5000/api/v1/Agaya/category`);
            if (!res.ok) {
                 throw new Error("Failed to fetch product");
            }
            const data = await res.json();
            const category = data.data;
            setcategory(category);
        } catch (err) {
            throw new Error("Can not get Data");
        }
    }

    useEffect(() => {       
        getData();
    }, []);
    if (!category) return <p>Loading...</p>;
    console.log("category: ",category);

  return (
      <div className="w-full h-150">
        <div className="relative w-full h-150 bg-white shadow-[0px_0px_4px_1px_#0000001a] overflow-y-auto">
          <div className="py-10 px-17 top-[30px] left-[51px] w-[400px] text-4xl font-medium text-black text-center whitespace-nowrap">
            Category Management
          </div>

          <img
            className="w-full h-[1px] top-[115px] left-[51px] px-[63px]"
            alt="Line"
            src = "https://i.postimg.cc/ZKYXghDG/black-1.png"
          />
          <div className="w-full bg-white px-[63px] py-[30px] flex flex-col gap-4">
            <CategoryMHeader />
            {category.map((cat, index) => (
                <CategoryCard key={index} Category={cat} onSuccess={getData}/>
            ))}

            <CreateCategory onSuccess={getData}/>
          </div>
        </div>
      </div>
  );
};
export default CategoryManagement;