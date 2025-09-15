import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa"; 
const ProfileImageUploader = ({ onFileSelect, initialImage }) => {
  const [imagePreview, setImagePreview] = useState(initialImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImagePreview(initialImage || null);
  }, [initialImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      onFileSelect(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
      />

      <div
        className="relative w-32 h-32 cursor-pointer group"
        onClick={handleImageClick}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
          />
        ) : (
          <FaUserCircle size={128} className="text-gray-300" />
        )}

        <div 
          className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaCamera size={24} />
          <span className="text-sm mt-1">แก้ไข</span>
        </div>
      </div>
    </>
  );
};

export default ProfileImageUploader;