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
          onClick={() => onApprove(application._id)}
          className="flex h-10 w-24 !bg-[#48B3AF] text-white items-center justify-center"
        >
          อนุมัติ
        </button>
        <button 
          onClick={() => onReject(application._id)}
          className="flex h-10 w-24 !bg-[#B71F3B] text-white items-center justify-center"
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
      setLoading(true);
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

  const handleApprove = async (id) => {
    try {
      await approveApplication(id);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      alert("อนุมัติไม่สำเร็จ: " + err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      alert("ปฏิเสธไม่สำเร็จ: " + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading applications...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        Approve Vendor
      </div>
      <div className="p-8">
        <div className="flex flex-col gap-4">
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
    </>
  );
}

export default ApproveVendorPage;