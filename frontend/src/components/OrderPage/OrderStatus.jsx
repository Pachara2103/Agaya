import { useEffect, useState } from "react";
import RenderIcon from './RenderIcon';

export default function OrderStatus({ Status }) {
  const [nowstatus, setNowStatus] = useState(null);
  const statusType = [
    {
      statusKey: "ORDER_RECEIVED",
      description: "คำสั่งซื้อได้รับการยืนยันและรอเตรียมการจัดส่ง",
    },
    {
      statusKey: "PICKED_UP",
      description: "ผู้ส่งได้นำพัสดุมาส่งที่จุดรับแล้ว",
    },
    {
      statusKey: "IN_TRANSIT",
      description: "พัสดุอยู่ระหว่างขนส่ง",
    },
    {
      statusKey: "DELIVERED",
      description: "จัดส่งสำเร็จ: พัสดุถูกจัดส่งถึงผู้รับเรียบร้อยแล้ว",
    },
    {
      statusKey: "DISPUTED",
      description: "สินค้ากำลังอยู่ระหว่างการคืนสินค้า",
    },
    {
      statusKey: "COMPLETED",
      description: "ลูกค้าได้รับสินค้าและการสั่งซื้อเสร็จสมบูรณ์",
    },
  ];

  useEffect(() => {
    setNowStatus(Status[Status.length - 1].statusKey);
  }, [Status]);

  const toDateString = (value) => {
    const date = new Date(value);
    const year = date.getFullYear() + 543;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}`;
  };
  const isLast = (i) => {
    return i == Status.length - 1;
  };

  return (
    <div className="p-4 sm:p-8 bg-[#F8F8F8] font-sans">
      <div className="max-w-2xl mx-auto">
        <ul>
          {statusType.map((i, index) => (
            <li key={i.id} className={`relative ${index !== 5 ? "pb-3" : ""}`}>
              {index !== 5 && (
                <div
                  className={`absolute top-5 left-5 -ml-px w-0.5 h-full bg-[#7D8184] ${
                    isLast(index) ? "bg-teal-500" : "bg-[#7D8184]"
                  }`}
                />
              )}

              <div className="relative flex space-x-3">
                <RenderIcon statusType={i.statusKey} completed={isLast(index)} />

                <div className="min-w-0 flex-1 pt-2">
                  <p className="text-md text-gray-700 pt-1 flex flex-row">
                    <span className="font-semibold mr-2 text-black">
                      {(index < Status.length - 1 ||
                        index == Status.length - 1) && (
                        <div>{toDateString(Status[index].timestamp)}</div>
                      )}
                      {index > Status.length - 1 && <div>dd/mm/yyyy --:--</div>}
                    </span>

                    <span
                      className={`ml-1 text-gray-600" ${
                        isLast(index) ? "text-teal-500" : "text-gray-500"
                      }`}
                    >
                      {i.description}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
