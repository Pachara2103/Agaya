const User = require('../models/user');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/token-blacklist');

//Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    //Make sure token exists
    if (!token) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route1'});
    }
    try {
        //Check token in blacklist
        const blacklisted = await TokenBlacklist.findOne({token});
        if (blacklisted) {
            return res.status(401).json({success: false, message: 'Token is revoked'})
        }

        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({success: false, message: 'User no longer exists'});
        }

        next();
    } catch (err) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route2'});
    }
}

//Grant access to specific roles
// Fix authorize
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        
        const userRoles = req.user.userType; // Assuming userType is an array of strings from the model
        const hasRequiredRole = userRoles.some(role => roles.includes(role));

        if (!hasRequiredRole) {
            return res.status(403).json({
                success: false,
                message: `User role '${userRoles.join(', ')}' is not authorized to access this route`
            });
        }
        next();
    };
};



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
