import { useState, useRef } from "react";

const ImageUploader = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (event) => {
    event.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        style={{ display: "none" }} // ซ่อน input element นี้
      />

      <div
        className="w-32 h-32 relative flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-50"
        onClick={handleBoxClick}
      >
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="delete"
              title="ลบรูปภาพ"
            >
              &times;
            </button>
          </>
        ) : (
          // ถ้ายังไม่มีรูปภาพ: แสดงกล่องอัปโหลด
          <div className="w-full h-full border-2 border-dashed rounded-md flex flex-col items-center justify-center text-red-500">
            <span className="text-3xl">+</span>
            <span className="text-sm font-semibold">เพิ่มภาพสินค้า</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
