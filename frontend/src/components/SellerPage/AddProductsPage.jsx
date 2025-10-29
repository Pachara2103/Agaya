import ImageUploader from "./ImageUploader";
import { createProduct, updateProduct, deleteProduct, uploadProductImage, } from "../../libs/productService";
import { useEffect, useState } from "react";
import AddProductSidebar from "./AddProductSidebar";
import { getCategories } from "../../libs/categoryService";
import LoadingOverlay from '../LoadingOverlay';

const AddProductsPage = ({ setPageSelected, product, isEdit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [promotion, setPromotion] = useState("");
  const [haspromotion, setHasPromotion] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [confirmdelete, setConfirmDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allcategory, setAllCategory] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const clickDelete = () => { setConfirmDelete(true); };
  const handlePromotion = (value) => { setHasPromotion(value) }

  const DeleteProduct = async () => {
    const res = await deleteProduct(product._id);

    if (res.success) {
      alert("ลบสินค้าสำเร็จ");
      setPageSelected("สินค้าของฉัน");
      return;
    }
    alert("ลบสินค้าไม่สำเร็จ กรุณาลองใหม่");
  };
  const getThaiDate = (date) => {
    const dateObj = new Date(date);
    const thaiDate = new Date(dateObj.getTime() + 7 * 60 * 60 * 1000);
    return (thaiDate.toISOString()).split("T")[0]
  }
  const productDataForm = (value, imageUrl) => {
    return {
      productName: name,
      type: category,
      productDescription: description,
      price: parseFloat(price) || 0,
      stockQuantity: parseInt(stock, 10) || 0,
      image: imageUrl ? [imageUrl] : [],
      ...(value && {
        promotion:
          { active: haspromotion, promoDiscount: parseInt(promotion, 10), startDate: startDate, endDate: endDate }
      })
    };
  }

  useEffect(() => {
    if (product) {
      let price = product.price.toString();
      let q = product.stockQuantity.toString();
      setName(product.productName);
      setDescription(product.productDescription);
      setCategory(product.type);
      setPrice(price);
      setStock(q);
      if (product.promotion && product.promotion.active) {
        setHasPromotion(product.promotion.active)
        setPromotion(product.promotion.promoDiscount ? product.promotion.promoDiscount.toString() : "");
        setStartDate(product.promotion.startDate ? getThaiDate(product.promotion.startDate) : "");
        setEndDate(product.promotion.endDate ? getThaiDate(product.promotion.endDate) : "");
      }

    }
    const getCategoryData = async () => {
      const categorydata = await getCategories();
      const allCategory = categorydata.data;
      console.log(allCategory);
      setAllCategory(allCategory);
    }
    getCategoryData();
  }, []);

  //callback
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const submit = async () => {
    if (!name || !category || !description || !price || !stock) { alert("กรุณากรอกข้อมูลให้ครบทุกช่อง"); return; }
    if (!isEdit && !selectedFile) { alert("กรุณาเพิ่มรูปภาพสินค้า"); return; }
    setIsLoading(true)
    try {
      let imageUrl = isEdit && product.image ? product.image[0] : null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await uploadProductImage(formData);
        console.log('uploadRes= ', uploadRes)

        if (uploadRes.success) { imageUrl = uploadRes.imageUrl; } // ได้ URL จาก Cloudinary แล้ว
        else throw new Error("Image upload failed");
      }
      const productData = productDataForm(haspromotion, imageUrl);
      let res;
      if (!isEdit) {
        res = await createProduct(productData);
      } else {
        res = await updateProduct(product._id, productData);
      }

      if (res.success) {
        alert(isEdit ? "อัพเดตสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ");
        setPageSelected("สินค้าของฉัน");
      } else {
        alert(res.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาด: " + e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="flex space-x-8">
        <AddProductSidebar
          name={name}
          img={selectedFile}
          category={category}
          description={description}
          price={price}
          stock={stock}
        />

        <div className="w-3/4 relative">
          {isloading && (<LoadingOverlay isloading={isloading} />)}

          <div className="bg-white p-6 rounded-lg shadow mb-8 px-15">
            <div class="flex flex-row justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                ข้อมูลทั่วไป
              </h3>
              <div className="relative">
                {isEdit &&
                  (<button className="button-border-red w-20" onClick={clickDelete} >ลบสินค้า</button>)}

                {confirmdelete && (
                  <div className="absolute top-full right-0 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg border z-10">
                    <p className="text-sm text-gray-700 mb-4">                    คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?                   </p>
                    <div className="flex justify-end space-x-2" onClick={() => setConfirmDelete(false)}  >
                      <button className="button-white flex-1">ยกเลิก</button>
                      <button className="button-border-red flex-1" onClick={DeleteProduct} > ยืนยัน </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start ">
              <div className="flex flex-row gap-10 p-2">
                <label className="text-sm text-gray-600 mb-2">ภาพสินค้า</label>

                <div className="w-32 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-red-500 cursor-pointer hover:bg-red-50">
                  <ImageUploader
                    onFileSelect={handleFileSelect}
                    initialImage={isEdit && product && product.image ? product.image[0] : null}
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-4 ">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    <span className="text-red-500">*</span> ชื่อสินค้า
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="ชื่อสินค้า + ชื่อแบรนด์ + คุณลักษณะของสินค้า"
                    className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    <span className="text-red-500">*</span> หมวดหมู่
                  </label>
                  <select
                    id="category"
                    className="border-3 border-[#c6c6c6] text-[#878787] w-full p-4 outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">กรุณาเลือกหมวดหมู่ของสินค้า</option>
                    {allcategory.map((category, index) => (
                      <option value={category.categoryName}>{category.categoryName}</option>
                    ))}

                  </select>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="mt-6 flex flex-row gap-5">
              <label className="text-sm text-gray-600 w-1/10">รายละเอียด</label>
              <textarea
                id="description"
                rows="8"
                placeholder={`กรุณากรอกรายละเอียดของสินค้า\n\n• ไซส์ / ขนาดของสินค้า\n• น้ำหนัก\n• คุณสมบัติพิเศษ\n• วิธีการใช้\n• การรับประกันสินค้า`}
                className="border-3 border-[#c6c6c6] text-[#878787]  w-full p-4 outline-none resize-none"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              ข้อมูลการขาย
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="text-sm text-gray-600">
                  <span className="text-red-500">*</span> ราคาสินค้า
                </label>
                <input
                  id="price"
                  type="text"
                  className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  <span className="text-red-500">*</span> คลังสินค้า
                </label>
                <input
                  id="stock"
                  type="text"
                  className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-2">

                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="text-red-500">*</span> โปรโมชั่น

                  <div className="flex flex-row gap-2 items-center">
                    <button className={`w-4 h-4 rounded-full border-2 border-gray-500 cursor-pointer ml-4 ${haspromotion ? "bg-green-500" : ""}`}
                      onClick={() => handlePromotion(true)}  >
                    </button>
                    <p>Yes</p>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <button className={`w-4 h-4 rounded-full border-2 border-gray-500 cursor-pointer ml-4 ${haspromotion ? "" : "bg-green-500"}`}
                      onClick={() => handlePromotion(false)}  >
                    </button>
                    <p>No</p>
                  </div>

                  {haspromotion && (
                    <div className="text-black ml-5"> Example Date:
                      <span className="text-red-500 font-bold"> 2025-10-31</span>
                    </div>
                  )}


                </label>

                <div className="grid grid-cols-10 gap-x-2">
                  <input
                    id="stock"
                    type="text"
                    placeholder="5=discount 5%"
                    disabled={!haspromotion}
                    className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'} col-span-3`}
                    value={haspromotion ? promotion : ''}
                    onChange={(e) => {
                      setPromotion(e.target.value);
                    }}
                  />
                  <input
                    id="text"
                    type="text"
                    placeholder="Start Date"
                    disabled={!haspromotion}
                    className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'} col-span-3`}
                    value={haspromotion ? startDate : 'No Promotion'}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  />
                  <input
                    id="stock"
                    type="text"
                    placeholder="End Date"
                    disabled={!haspromotion}
                    className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'} col-span-3`}
                    value={haspromotion ? endDate : 'No Promotion'}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />

                </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 ">
            <button
              className="button-white w-20"
              onClick={() => setPageSelected("สินค้าของฉัน")}
            >
              ยกเลิก
            </button>
            <button
              className="button-border-green w-20"
              onClick={() => submit()}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsPage;
