import { getUser } from "../../../libs/fetchUserUtils";
import { showDetail } from "./showDetail";
import { useState } from "react";
import { AdminResponseForm } from "./AdminResponeForm";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export function DisputeBox({ data, onDisputeUpdate }) {
  console.log("hehe3", data);
  const [username, setUsername] = useState("");
  const { _id, customerId, orderId, products, status, requestDate, reason } =
    data;
  const reqDate = formatDate(requestDate || "2025-10-15T10:49:08.377Z");
  const time = formatTime(requestDate || "2025-10-15T10:49:08.377Z");
  const fetchUsername = async () => {
    const res = await getUser(customerId);
    setUsername(res.data.email);
  };
  // ["PENDING", "APPROVED", "REJECTED", "SHIPPED", "RECEIVED", "COMPLETED"]
  const statusColor = (status) => {
    return status === "PENDING"
      ? "bg-yellow-500"
      : status === "APPROVED"
      ? "bg-blue-900"
      : status === "REJECTED"
      ? "bg-red-700"
      : status === "SHIPPED"
      ? "bg-purple-700"
      : status === "RECEIVED"
      ? "bg-pink-500"
      : status === "COMPLETED"
      ? "bg-green-600"
      : "bg-white";
  };
  fetchUsername();
  console.log(username);
  const [detailState, setDetailState] = useState(false);
  return (
    <>
      <div>
        {/* mainbox */}
        <div className="flex w-full min-h-20 bg-white shadow-[0_0_1px_1px_rgba(221,221,221,0.7)] p-2">
          {/* Data box */}
          <div className="flex flex-col flex-4 bg-white">
            <div className="flex-1 flex items-center gap-4 ">
              <span className="font-[400] text-black text-[12px]">
                {username}
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4 ">
              <span className="font-[100] text-black text-[12px]">
                {reqDate}
              </span>
              <span className="font-[100] text-black text-[12px]">{time}</span>
            </div>
            <div className="flex-1 flex items-center gap-4 ">
              <span>
                <span className="font-[600] text-black text-[12px]">
                  Reason Type:{" "}
                </span>
                <span className="font-[200] text-black text-[12px]">
                  {reason}
                </span>
              </span>
            </div>
          </div>
          {/* Status box */}
          <div className="flex-3 flex justify-center pt-1 bg-white">
            <span className="h-5 p-1 font-[600] text-black text-[14px]">
              Status:{" "}
            </span>
            <span
              className={`flex items-center justify-center rounded-full w-22 h-5 ${statusColor(
                status
              )} p-1 text-[12px]`}
            >
              {status}
            </span>
          </div>
          {/* Button container */}
          <div className="flex-3 flex items-center justify-center">
            <div
              className="flex items-center justify-center h-10 w-24 bg-[#48B3AF] text-white font-[100] cursor-pointer"
              onClick={() => setDetailState(!detailState)}
            >
              {detailState ? "Close Detail" : "Detail"}
            </div>
          </div>
        </div>
        {/* detail */}
        {detailState ? (
          <>
            {showDetail(_id, username, customerId, orderId._id, products, reason)}
            {/* {showDetail(_id, username, orderId._id, products, reason)} */}
            {status === "PENDING" && (
              <AdminResponseForm 
                disputeId={_id} 
                onProcessComplete={onDisputeUpdate} 
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}