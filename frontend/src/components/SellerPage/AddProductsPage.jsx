import ImageUploader from "./ImageUploader";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../../libs/productService";
import { useEffect, useState } from "react";
import AddProductSidebar from "./AddProductSidebar";

const AddProductsPage = ({ setPageSelected, product, isEdit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [confirmdelete, setConfirmDelete] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const clickDelete = () => {
    setConfirmDelete(true);
  };

  const DeleteProduct = async () => {
    const res = await deleteProduct(product._id);

    if (res.success) {
      alert("ลบสินค้าสำเร็จ");
      setPageSelected("สินค้าของฉัน");
      return;
    }
    alert("ลบสินค้าไม่สำเร็จ กรุณาลองใหม่");
  };

  useEffect(() => {
    if (product) {
      console.log(" AddProductsPage p = ", product);
      let price = product.price.toString();
      let q = product.stock_quantity.toString();
      setName(product.product_name);
      setDescription(product.product_description);
      setCategory(product.type);
      setPrice(price);
      setStock(q);
    }
  }, []);

  useEffect(() => {
    console.log(" AddProductsPage nameeeee = ", name);
  }, [name]);
  //callback
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // const submit = async () => {
  //   const quantity = parseInt(stock, 10) || 0;
  //   const productData = {
  //     product_name: name,
  //     type: category,
  //     product_description: description,
  //     price: parseFloat(price) || 0, // แปลงเป็นตัวเลข
  //     stock_quantity: quantity, // แปลงเป็นเลขจำนวนเต็ม
  //   };

  //   if (!name || !category || !description || !price || !stock) {
  //     alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
  //     return;
  //   }
  //   try {
  //     if (!isEdit) {
  //       const res = await createProduct(productData);
  //       if (res.success) {
  //         alert("เพิ่มสินค้าสำเร็จ");
  //         setPageSelected("สินค้าของฉัน");
  //         return;
  //       }
  //       alert("เพิ่มสินค้าไม่สำเร็จ กรุณาลองใหม่");
  //     } else {
  //       const res = await updateProduct(product._id, productData);
  //       if (res.success) {
  //         alert("อัพเดตสินค้าสำเร็จ");
  //         setPageSelected("สินค้าของฉัน");
  //         return;
  //       }
  //       alert("อัพเดตสินค้าไม่สำเร็จ กรุณาลองใหม่");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const submit = async () => {
    if (!name || !category || !description || !price || !stock) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (!isEdit && !selectedFile) {
        alert("กรุณาเพิ่มรูปภาพสินค้า");
        return;
    }

    try {
      let imageUrl = isEdit && product.image ? product.image[0] : null;

      // 🖼️ ขั้นตอนอัปโหลดรูปภาพ
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile); 
        
        const uploadRes = await uploadProductImage(formData);
        
        if (uploadRes.success) {
          imageUrl = uploadRes.imageUrl; // ได้ URL จาก Cloudinary แล้ว
        } else {
          throw new Error("Image upload failed");
        }
      }

      const productData = {
        product_name: name,
        type: category,
        product_description: description,
        price: parseFloat(price) || 0,
        stock_quantity: parseInt(stock, 10) || 0,
        image: imageUrl ? [imageUrl] : [], 
      };

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

    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาด: " + e.message);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="flex space-x-8">
        <AddProductSidebar />

        <div className="w-3/4">
          <div className="bg-white p-6 rounded-lg shadow mb-8 px-15">
            <div class="flex flex-row justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                ข้อมูลทั่วไป
              </h3>
              <div className="relative">
                {isEdit && (
                  <button
                    className="button-border-red w-20"
                    onClick={() => clickDelete()}
                  >
                    ลบสินค้า
                  </button>
                )}

                {confirmdelete && (
                  <div
                    // Style สำหรับจัดตำแหน่งและหน้าตาของกล่อง
                    className="absolute top-full right-0 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg border z-10"
                  >
                    <p className="text-sm text-gray-700 mb-4">
                      คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?
                    </p>
                    <div
                      className="flex justify-end space-x-2"
                      onClick={() => setConfirmDelete(false)}
                    >
                      <button className="button-white flex-1">ยกเลิก</button>
                      <button
                        className="button-border-red flex-1"
                        onClick={() => DeleteProduct()}
                      >
                        ยืนยัน
                      </button>
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
                    className="border-3 border-[#c6c6c6] text-[#878787] w-full p-4 outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">กรุณาเลือกหมวดหมู่ของสินค้า</option>
                    <option value="electronics">อิเล็กทรอนิกส์</option>
                    <option value="clothes">เสื้อผ้า</option>
                    <option value="food">อาหาร</option>
                    <option value="furniture">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="mt-6 flex flex-row gap-5">
              <label className="text-sm text-gray-600 w-1/10">รายละเอียด</label>
              <textarea
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  <span className="text-red-500">*</span> ราคาสินค้า
                </label>
                <input
                  type="text"
                  className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  <span className="text-red-500">*</span> คลังสินค้า
                </label>
                <input
                  type="text"
                  className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
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
