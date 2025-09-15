const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

//  just like mongodb
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'agaya-products', 
    allowed_formats: ['jpeg', 'png', 'jpg'], // ผมใส่เพื่อไปอันนึงจริงๆเรามีแค่ 2 แต่มันคล้ายกัน
    
    public_id: (req, file) => 'product-' + Date.now(), 
  },
});

const upload = multer({ 
  storage: storage 
});

module.exports = upload;