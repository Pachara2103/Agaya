export const ordersByShop = [
    {
      shopName: "HAVIT Official Store",
      products: [
        {
          _id: "generated-id-1",
          productName: "HAVIT HV-G92 Gamepad",
          price: 120,
          image: ["https://i.postimg.cc/MGvFk4TQ/g92-2-500x500-1.png"],
        },
        {
          _id: "generated-id-3",
          productName: "Gaming Headset H2002d",
          price: 450,
          image: [],
        },
        {
          _id: "generated-id-4",
          productName: "RGB Gaming Mouse",
          price: 250,
          image: [],
        },
      ],
    },
    {
      shopName: "AK-Keyboard Thailand",
      products: [
        {
          _id: "generated-id-2",
          productName: "AK-900 Wired Keyboard",
          price: 960,
          image: ["https://i.postimg.cc/dQRgy7cp/ak-900-01-500x500-1.png"],
        },
        {
          _id: "generated-id-2",
          productName: "AK-900 Wired Keyboard",
          price: 960,
          image: [],
        },
      ],
    },
  ];

 export const ex2 = [
  {
    statusKey: "ORDER_RECEIVED",
    description: "คำสั่งซื้อได้รับการยืนยันและรอเตรียมการจัดส่ง",
    timestamp: "2025-10-15T09:58:07.432Z",
  },
  {
    statusKey: "PICKED_UP",
    description: "ผู้ส่งได้นำพัสดุมาส่งที่จุดรับแล้ว",
    timestamp: "2025-10-15T10:01:50.892Z",
  },
  {
    statusKey: "IN_TRANSIT",
    description: "พัสดุอยู่ระหว่างขนส่ง",
    timestamp: "2025-10-15T10:02:18.016Z",
  },
  {
    statusKey: "DELIVERED",
    description: "จัดส่งสำเร็จ: พัสดุถูกจัดส่งถึงผู้รับเรียบร้อยแล้ว",
    timestamp: "2025-10-15T10:02:33.843Z",
  },
  {
    statusKey: "DISPUTED",
    description: "สินค้ากำลังอยู่ระหว่างการคืนสินค้า",
    timestamp: "2025-10-15T10:02:48.063Z",
  },
  {
    statusKey: "COMPLETED",
    description: "ลูกค้าได้รับสินค้าและการสั่งซื้อเสร็จสมบูรณ์",
    timestamp: "2025-10-15T10:05:33.899Z",
  },
];