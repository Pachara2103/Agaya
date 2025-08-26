const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //Make sure token exists
    if (!token) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route'});
    }
    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        console.log(err.stack);
        return res.status(401).json({success: false, message: 'Not authorized to access this route'});
    }
}

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({success: false, message: "User's role is not authorized to access this route"});
        }
        next(); //if valid, go on
    }
}

// ตัวอย่างการเรียกใช้ auth เพื่อแยกให้ user แต่ละแบบเข้าใช้งานเว็บได้แตกต่างกัน
// const { protect, authorize } = require('./middleware/auth');

// router.get('/products/:id', protect, (req, res) => {
//   // ผู้ใช้ล็อกอินทุกคนเข้าถึงได้
// });

// router.post('/products', protect, authorize('vendor', 'admin'), (req, res) => {
//   // เฉพาะ vendor หรือ admin ที่สร้างสินค้าได้
// });

// router.delete('/products/:id', protect, authorize('admin'), (req, res) => {
//   // เฉพาะ admin ที่ลบสินค้าได้
// });
