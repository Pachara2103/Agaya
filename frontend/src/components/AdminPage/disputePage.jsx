import { useState } from "react";
import "./disputePage.css";
import { useEffect } from "react";
import { getReturnRequests } from "../../libs/returnService";
import { DisputeBox } from "./DisputeComponent/DisputeBox";
import { StatusButton } from "./DisputeComponent/statusButton";

function DisputePage() {
  const [disputes, setDisputes] = useState(null);
  const fetchDispute = async () => {
    const res = await getReturnRequests();
    // console.log(res.data.returnReqs);
    setDisputes(res.data.returnReqs);
    return res;
  };

  const handleDisputeUpdate = () => { 
    setDisputes(null); // Op can comment this out
    fetchDispute(); 
  };

  const displayDisputes = (disputes, filter) => {
    if (!disputes) return null;
    const {
      pendingFilter,
      approvedFilter,
      rejectedFilter,
      shippedFilter,
      receivedFilter,
      completedFilter,
    } = filter;
    const statusFilterMap = {
      "PENDING": filter.pendingFilter,
      "APPROVED": filter.approvedFilter,
      "REJECTED": filter.rejectedFilter,
      "SHIPPED": filter.shippedFilter,
      "RECEIVED": filter.receivedFilter,
      "COMPLETED": filter.completedFilter,
    };
    return disputes.map((dispute, index) =>
      statusFilterMap[dispute.status] ? (
        <DisputeBox key={index} data={dispute} onDisputeUpdate={handleDisputeUpdate}/>
      ) : null
    );
  };
  useEffect(() => {
    fetchDispute();
  }, []);
  useEffect(() => {
    if (disputes) {
    }
  }, [disputes]);
  const [pendingFilter, setPendingFilter] = useState(true);
  const [approvedFilter, setApprovedFilter] = useState(true);
  const [rejectedFilter, setRejectedFilter] = useState(true);
  const [shippedFilter, setShippedFilter] = useState(true);
  const [receivedFilter, setReceivedFilter] = useState(true);
  const [completedFilter, setCompletedFilter] = useState(true);
  let filter = {
    pendingFilter,
    approvedFilter,
    rejectedFilter,
    shippedFilter,
    receivedFilter,
    completedFilter,
  };
  // ["PENDING", "APPROVED", "REJECTED", "SHIPPED", "RECEIVED", "COMPLETED"],

  const statusButtonsData = [
    { text: "PENDING", state: pendingFilter, setState: setPendingFilter, colorOn: "bg-[rgba(255,219,110,1)]", colorOff: "bg-[rgba(255,243,208,1)]" },
    { text: "APPROVED", state: approvedFilter, setState: setApprovedFilter, colorOn: "bg-[rgba(161,152,255,1)]", colorOff: "bg-[rgba(208,214,255,1)]" },
    { text: "SHIPPED", state: shippedFilter, setState: setShippedFilter, colorOn: "bg-[rgba(200,132,255,1)]", colorOff: "bg-[rgba(243,205,255,1)]" },
    { text: "RECEIVED", state: receivedFilter, setState: setReceivedFilter, colorOn: "bg-[rgba(255,152,234,1)]", colorOff: "bg-[rgba(255,219,249,1)]" },
    { text: "COMPLETED", state: completedFilter, setState: setCompletedFilter, colorOn: "bg-[rgba(110,255,120,1)]", colorOff: "bg-[rgba(208,255,216,1)]" },
    { text: "REJECTED", state: rejectedFilter, setState: setRejectedFilter, colorOn: "bg-[rgba(255,110,110,1)]", colorOff: "bg-[rgba(255,208,208,1)]" },
  ];
  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Dispute Management
      </div>
      <div className="w-[680px] mx-15 border-t border-1 border-black"></div>
      <div className="flex mx-15 p-2 h-24 gap-4">
        {statusButtonsData.map((button) => (
          <StatusButton
            key={button.text}
            text={button.text}
            colorOn={button.colorOn}
            colorOff={button.colorOff}
            state={button.state}
            setState={button.setState}
          />
        ))}
      </div>
      <div className="flex flex-col h-105 mx-15 gap-4 pt-2 px-2 flex-shrink-0 overflow-y-scroll scrollbar">
        {displayDisputes(disputes, filter)}
      </div>
    </>
  );
}

export default DisputePage;
