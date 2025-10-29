import { useEffect, useState } from "react";
import { getPendingApplications, approveApplication, rejectApplication } from "../../libs/adminService";

const ApplicationCard = ({ application, onApprove, onReject }) => {
  return (
    <div className="flex w-full bg-white border border-gray-200 p-4 shadow-[0_0_1px_1px_rgba(221,221,221,0.7)] flex-shrink-0">
      <div className="flex-1 flex flex-col gap-1 justify-center">
        <h3 className="font-bold text-lg text-black">{application.storeName}</h3>
        <p className="text-sm text-black">ตัวอย่างสินค้า: {application.sampleProducts}</p>
        <p className="text-sm text-black mt-1">ที่อยู่: {application.address || 'N/A'}</p>
      </div>
      <div className="flex-1 flex gap-2 items-center justify-end">
        <button 
          onClick={() => onApprove(application._id, application.storeName)}
          className="flex h-10 w-24 !bg-[#48B3AF] text-white items-center justify-center cursor-pointer"
        >
          อนุมัติ
        </button>
        <button 
          onClick={() => onReject(application._id, application.storeName)}
          className="flex h-10 w-24 !bg-[#B71F3B] text-white items-center justify-center cursor-pointer"
        >
          ไม่อนุมัติ
        </button>
      </div>
    </div>
  );
};

function ApproveVendorPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const response = await getPendingApplications();
      if (response.success) {
        setApplications(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id, storeName) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการอนุมัติร้าน "${storeName}"?`)) {
      try {
        await approveApplication(id);
        alert(`อนุมัติร้าน "${storeName}" สำเร็จ`);
        fetchApplications(); 
      } catch (err) {
        alert("อนุมัติไม่สำเร็จ: " + err.message);
      }
    }
  };

  const handleReject = async (id, storeName) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธร้าน "${storeName}"?`)) {
      try {
        await rejectApplication(id);
        alert(`ปฏิเสธร้าน "${storeName}" สำเร็จ`);
        fetchApplications(); 
      } catch (err) {
        alert("ปฏิเสธไม่สำเร็จ: " + err.message);
      }
    }
  };

  if (loading) return <div className="p-6">Loading applications...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Approve Vendor
      </div>
      <img
            className="w-full h-[1px] top-[115px] left-[51px] px-[63px]"
            alt="Line"
            src = "https://i.postimg.cc/ZKYXghDG/black-1.png"
          />
      <div className="flex h-130 bg-white justify-center">
        <div className="flex-1 my-6 mx-12 bg-white p-1 text-black">
            {/* <h2 className="text-lg font-semibold">Pending Applications</h2>
            <hr className="my-4"/> */}
            <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-100">
                {applications.length > 0 ? (
                applications.map(app => (
                    <ApplicationCard 
                        key={app._id} 
                        application={app}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))
                ) : (
                <p className="text-gray-500">ไม่มีใบสมัครที่รอการอนุมัติ</p>
                )}
            </div>
        </div>
      </div>
    </>
  );
}

export default ApproveVendorPage;