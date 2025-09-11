const User = require('../models/User');
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

        //console.log(decoded);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({success: false, messga: 'User no longer exists'});
        }

        next();
    } catch (err) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route2'});
    }
}

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({success: false, message: "Not authenticated"});
        }

        const userRoles = Array.isArray(req.user.userType)
          ? req.user.userType
          : [req.user.userType];

        const authorized = userRoles.some(r =>
            roles.map(rr => rr.toLowerCase()).includes(r.toLowerCase())
        );

        if (!authorized) {
            return res.status(403).json({
                success: false,
                message: `Not authorized - expected one of [${roles}], got [${userRoles}]`
            });
        }

        // (In case userType.type() = string)
        // if (!roles.includes(req.user.userType)) {
        //     return res.status(403).json({success: false, message: "User's role is not authorized to access this route"});
        // }
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
