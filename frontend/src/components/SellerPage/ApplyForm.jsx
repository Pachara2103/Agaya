import { useRef, useState, useEffect } from "react";
import "./.css";
import { createVendorApplication, getMyApplicationStatus } from "../../libs/authService";

const Form = ({
  fileInputRef,
  handleFileChange,
  imagePreview,
  handleUploadButtonClick,
  shopname,
  product,
  address,
  onSubmit,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">ชื่อร้านค้า</label>

            <input
              type="text"
              id="store-name"
              name="store-name"
              onChange={(e) => {
                shopname(e.target.value);
              }}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">
              ตัวอย่างสินค้าที่จะขาย
            </label>
            <input
              type="text"
              id="product-example"
              onChange={(e) => {
                product(e.target.value);
              }}
              className="w-full px-4 py-2  text-gray-600 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">
              ที่อยู่ร้านค้า(กรณีมีหน้าร้าน)
            </label>
            <textarea
              id="seller-info"
              name="seller-info"
              rows="8"
              onChange={(e) => {
                address(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 -[3px] focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none text-gray-600"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start pt-2 ">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <img
                src="https://i.postimg.cc/br0yv892/user-1.png"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <button className="button" onClick={handleUploadButtonClick}>
            เลือกรูป
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            ขนาดไฟล์: สูงสุด 1 MB
            <br />
            ไฟล์ที่รองรับ: JPEG, PNG
          </p>
        </div>
      </div>

      <div className="text-center mt-10" onClick={() => onSubmit()}>
        <button className="w-[20%]">ยืนยัน</button>
      </div>
    </div>
  );
};

const Pending = ({ application }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex justify-between flex-row">
      <div >
        <h2 className="font-semibold text-lg text-gray-800">{application.storeName}</h2>
        <p className="text-gray-500 mt-1">{application.sampleProducts}</p>
        <p className="text-gray-500 mt-2 break-words w-140">{application.address}</p>
      </div>

      <div class="flex justify-center items-center">
        <span className="bg-yellow-200 text-black font-semibold px-4 py-4 rounded-lg">
          รอการดำเนินการ
        </span>
      </div>
    </div>
  );
};

const ApplyForm = () => {
  const [shopname, setShopName] = useState(null);
  const [product, setProduct] = useState(null);
  const [address, setAddeess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [confirm, setConfirm] = useState(false);

  // state
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyApplicationStatus()
      .then(response => {
        if (response.success && response.data) {
          setApplication(response.data);
        }
      })
      .catch(err => {
        console.error("Error fetching application status:", err);
        setError("Could not fetch application status.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!shopName || !product) {
      alert("Please fill in Store Name and Sample Products.");
      return;
    }
    try {
      const applicationData = {
        storeName: shopName,
        sampleProducts: product,
        address: address,
      };
      const response = await createVendorApplication(applicationData);
      if (response.success) {
        setApplication(response.data);
      }
    } catch (err) {
      console.error("Application submission failed:", err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  

  // const sendConfirm = () => {
  //   if (!shopname || !product || !address) return;
  //   setConfirm(true);
  // };

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  if (isLoading) {
    return <div className="text-center p-12">Loading...</div>;
  }

  return (
    <div class="flex justify-center py-5 w-screen h-[85vh]">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          กรอกใบสมัครขอเป็นผู้ขาย
        </h1>
        <hr className="mb-8" />
        {!application ? (
          <Form
            handleUploadButtonClick={handleUploadButtonClick}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            shopname={setShopName}
            product={setProduct}
            address={setAddress}
            onSubmit={handleSubmit}
          />
        ) : (
          <Pending application={application} />
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
