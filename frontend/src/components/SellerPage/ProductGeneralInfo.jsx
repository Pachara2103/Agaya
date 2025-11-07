import ImageUploader from './ImageUploader';

const ProductGeneralInfo = ({
  states, setters, handlers, isEdit, product
}) => {
  const { name, category, description, allcategory, errors } = states;
  const { setName, setCategory, setDescription, setErrors } = setters;
  const { handleFileSelect, validateName, validateDescription } = handlers;

  return (
    <div className="bg-white p-6 mx-auto rounded-lg shadow mb-8 px-10 sm:px-15 overflow-auto w-100 sm:w-270">
      <div className="flex sm:flex-row flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          ข้อมูลทั่วไป
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start ">
        <div className="flex flex-col sm:flex-row sm:gap-10 p-2 mt-2 sm:mt-0">
          <label className="text-sm text-gray-600 mb-2">ภาพสินค้า</label>
          <div className="w-32 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-red-500 cursor-pointer hover:bg-red-50">
            <ImageUploader
              onFileSelect={handleFileSelect}
              initialImage={isEdit && product && product.image ? product.image[0] : null}
            />
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
        <div className="col-span-2 space-y-4 ">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              <span className="text-red-500">*</span> ชื่อสินค้า
            </label>
            <input
              id="name"
              type="text"
              placeholder="ชื่อสินค้า (ไม่เกิน 200 ตัวอักษร)"
              className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                const error = validateName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, name: error }));
              }}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
              {allcategory.map((cat) => (
                <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-5">
        <label className="text-sm text-gray-600 sm:w-1/10 ">รายละเอียด</label>
        <textarea
          id="description"
          rows="8"
          placeholder={`รายละเอียดสินค้า (ไม่เกิน 200 ตัวอักษร)\n\n• ไซส์ / ขนาดของสินค้า\n• น้ำหนัก\n• คุณสมบัติพิเศษ\n• วิธีการใช้\n• การรับประกันสินค้า`}
          className="border-3 border-[#c6c6c6] text-[#878787] w-full p-4 outline-none resize-none"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            const error = validateDescription(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, description: error }));
          }}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
    </div>
  );
};

export default ProductGeneralInfo;
