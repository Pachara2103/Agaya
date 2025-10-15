const mongoose = require('mongoose');

const defaultDescriptions = {
    ORDER_RECEIVED: "คำสั่งซื้อได้รับการยืนยันและรอการจัดส่ง",
    PICKED_UP: "ผู้ส่งได้นำพัสดุมาส่งที่จุดรับแล้ว",
    IN_TRANSIT: "พัสดุอยู่ระหว่างขนส่ง",
    FAILED_ATTEMPT: "การจัดส่งพัสดุไม่สำเร็จ",
    DELIVERED: "จัดส่งสำเร็จ: พัสดุถูกจัดส่งถึงผู้รับเรียบร้อยแล้ว",
    COMPLETED: "ลูกค้าได้รับสินค้าและการสั่งซื้อเสร็จสมบูรณ์",
    DISPUTED: "สินค้ากำลังอยู่ระหว่างการคืนสินค้า",
    REFUNDED: "สินค้าถูกส่งคืนไปยังผู้ขายเรียบร้อยแล้ว"
};

exports.trackingEventSubschema = new mongoose.Schema({
    statusKey: {
        type: String,
        required: true,
        enum: [
            'ORDER_RECEIVED',
            'PICKED_UP',
            'IN_TRANSIT',
            // 'ARRIVED_LOCAL',
            // 'OUT_FOR_DELIVERY',
            'DELIVERED',
            'FAILED_ATTEMPT',
            'COMPLETED',
            'DISPUTED',
            'REFUNDED'
            // when customer click receive button on order history
            // else after 7 days make it complete
        ]
        // maybe if not communicate 
        // picked_up -> in_transit -> delivered 
        // handle if in_transit -> failed_attempt -> in_transit -> ... until -> delivered
    },
    description: {
        type: String,
        required: true,
        default: function () {
            return defaultDescriptions[this.statusKey];
        }
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {_id: false})

// {
//   "_id": "order_id_00001",
//   // ... other order fields ...
//   "orderTracking": [
//     {
//       "statusKey": "PICKED_UP",
//       "description": "ผู้ส่งได้นำพัสดุมาส่งที่จุดรับของแล้ว",
//       "timestamp": "2025-10-13T08:00:00.000Z"
//     },
//     {
//       "statusKey": "IN_TRANSIT",
//       "description": "พัสดุอยู่ระหว่างขนส่ง",
//       "timestamp": "2025-10-13T16:30:00.000Z"
//     },
//     {
//       "statusKey": "DELIVERED",
//       "description": "จัดส่งสำเร็จ: พัสดุถูกจัดส่งถึงผู้รับเรียบร้อยแล้ว",
//       "timestamp": "2025-10-14T11:45:00.000Z"
//     }
//   ]
// }