import { useState } from "react";
import "./disputePage.css";

const statusButton = (text, colorOn, colorOff, handler) => {
  const [state, setState] = useState(true);
  return (
    <>
      <div
        className={`flex items-center justify-center self-center p-4 h-8 w-24 text-black text-[13px] ${
          state ? colorOn : colorOff
        }`}
        onClick={() => setState(!state)}
      >
        <div className="m-1">{text}</div>
      </div>
    </>
  );
};
// #f8f8f8ff
const showDetail = (
  disputeId,
  username,
  orderId,
  productName,
  productId,
  reason
) => {
  return (
    <>
      <div className="min-h-30 bg-[#f8f8f8ff] text-black p-4">
        <div>{"Dispute ID: " + disputeId}</div>
        <div>{"customer: " + username}</div>
        <div>{"Order ID: " + orderId}</div>
        <div>{"Product: " + productName}</div>
        <div>{"Product ID: " + productId}</div>
        <div>{"Reason: " + reason}</div>
      </div>
    </>
  );
};
const disputeBox = (username, status, date, time) => {
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
              <span className="font-[100] text-black text-[12px]">{date}</span>
              <span className="font-[100] text-black text-[12px]">{time}</span>
            </div>
            <div className="flex-1 flex items-center gap-4 ">
              <span>
                <span className="font-[600] text-black text-[12px]">
                  Reason Type:{" "}
                </span>
                <span className="font-[200] text-black text-[12px]">
                  Product damaged
                </span>
              </span>
            </div>
          </div>
          {/* Status box */}
          <div className="flex-3 flex justify-center pt-1 bg-white">
            <span className="h-5 p-1 font-[600] text-black text-[14px]">
              Status:{" "}
            </span>
            <span className="flex items-center justify-center rounded-full w-22 h-5 bg-orange-300 p-1 text-[12px]">
              {status}
            </span>
          </div>
          {/* Button container */}
          <div className="flex-3 flex items-center justify-center">
            <div
              className="flex items-center justify-center h-10 w-24 bg-[#48B3AF] text-white font-[100] "
              onClick={() => setDetailState(!detailState)}
            >
              {detailState ? "Confirm" : "Detail"}
            </div>
          </div>
        </div>
        {/* detail */}
        {detailState ? showDetail("") : <></>}
      </div>
    </>
  );
};

function DisputePage() {
  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Dispute Management
      </div>
      <div className="w-[680px] mx-15 border-t border-1 border-black"></div>
      <div className="flex mx-15 p-2 h-24  gap-4">
        {statusButton(
          "PENDING",
          "bg-[rgba(255,219,110,1)]",
          "bg-[rgba(255,243,208,1)]",
          ""
        )}
        {statusButton(
          "REVIEWED",
          "bg-[rgba(122,110,255,1)]",
          "bg-[rgba(208,214,255,1)]",
          ""
        )}
        {statusButton(
          "RESOLVED",
          "bg-[rgba(110,255,120,1)]",
          "bg-[rgba(208,255,216,1)]",
          ""
        )}
        {statusButton(
          "REJECTED",
          "bg-[rgba(255,110,110,1)]",
          "bg-[rgba(255,208,208,1)]",
          ""
        )}
      </div>
      <div className="flex flex-col h-105 mx-15 gap-4 pt-2 px-2 flex-shrink-0 overflow-y-scroll scrollbar">
        {disputeBox(
          "CUS00000000000000000",
          "PENDING",
          "04/10/2568",
          "04:47:56"
        )}
        {disputeBox("CUS0", "PENDING", "04/10/2568", "04:47:56")}
        {disputeBox(
          "CUS00000000000000000",
          "PENDING",
          "04/10/2568",
          "04:47:56"
        )}
        {disputeBox(
          "CUS00000000000000000",
          "PENDING",
          "04/10/2568",
          "04:47:56"
        )}
      </div>
    </>
  );
}

export default DisputePage;
