const express = require("express");
const { 
    findAll, 
    findById,  //เพิ่มมา แทน create
    update, 
    deleteUser 
} = require("../controllers/user-controller");
const { protect } = require('../middleware/auth'); 
const router = express.Router();

/* 
  อาจใส่ auth admin กันไว้ตอนเปิด ใส่มาตอนนี้น่าจะวุ่น
  แล้วก็ update จริงๆอยากแยกไปเลย คือมี update ของ admin เอาไว้แก้ role ให้ user
  กับ update เดิมเนื่องจากมี auth-controller อะ ก็ว่าจะเอา update ไปใส่ใน auth-controller ให้มัน
  อัพเดทตัวเองได้
  user-controller ก็มองว่าเป็นของ admin ไปเลย T_T 
*/ 
router.use(protect);

router.route("/").get(findAll);
router.route("/:id").get(findById).put(update).delete(deleteUser);

module.exports = router;