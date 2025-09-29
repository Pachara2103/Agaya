const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary'); 
const { protect } = require('../middleware/auth'); 

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  /*
    req.file contains information about the uploaded file
    req.file.path is the URL of the uploaded image on Cloudinary

    𐔌՞꜆.  ̫.꜀՞𐦯   someone give me coffee pls
  
  */
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl: req.file.path
  });
});

module.exports = router;