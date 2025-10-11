import {React, useState, useEffect} from 'react';
import axios from 'axios';
import AddressList from './AddressList.jsx';
import AddAddressForm from './AddAddressForm.jsx';

function Address() {
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const fetchAddresses = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('กรุณาเข้าสู่ระบบเพื่อดูข้อมูล');
            setIsLoading(false);
            return;
        }

         try {
            console.log("1. กำลังพยายามดึงข้อมูลผู้ใช้...");
            // 1. ดึงข้อมูล User ปัจจุบัน (เพื่อเอา ID)
            const userResponse = await axios.get('http://localhost:5000/api/v1/Agaya/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("2. ดึงข้อมูลผู้ใช้สำเร็จ:", userResponse.data);
            setCurrentUser(userResponse.data.data);

            // 2. ดึงรายการที่อยู่ทั้งหมดโดยใช้ ID ของผู้ใช้ปัจจุบัน
            if (userResponse.data.data?._id) {
                const userId = userResponse.data.data._id;
                const addressUrl = `http://localhost:5000/api/v1/Agaya/address/${userId}/addresses`;

                console.log("3. กำลังดึงข้อมูลที่อยู่จาก:", addressUrl);

                const addressResponse = await axios.get(addressUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("4. ดึงข้อมูลที่อยู่สำเร็จ:", addressResponse.data);
                
                // หมายเหตุ: ถ้า Backend ส่ง array กลับมาใน key อื่นที่ไม่ใช่ 'data' ให้แก้ตรงนี้
                setAddresses(addressResponse.data);
            } else {
                // กรณีที่ไม่พบ User ID
                setAddresses([]);
            }

        } catch (err) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
            setError('ไม่สามารถโหลดข้อมูลได้');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSaveAddress = async (formDataFromForm) => {
        const token = localStorage.getItem('authToken');
        if (!token || !currentUser?._id) { 
            alert('ข้อมูลผู้ใช้ไม่พร้อม กรุณาลองอีกครั้ง');
            return;
        }

        const isDuplicate = addresses.some(existingAddress =>
            existingAddress.name.trim() === formDataFromForm.fullName.trim() &&
            existingAddress.phoneNumber.trim() === formDataFromForm.phoneNumber.trim() &&
            existingAddress.address.trim() === formDataFromForm.addressLine1.trim()
        );

        if (isDuplicate) {
            alert("คุณได้บันทึกที่อยู่นี่ไว้แล้ว");
            return;
        }

        // 1. เตรียมข้อมูลให้ตรงกับ Backend Model
        const requestData = {
            name: formDataFromForm.fullName, // key ต้องชื่อ 'name'
            phoneNumber: formDataFromForm.phoneNumber,
            address: formDataFromForm.addressLine1, // key ต้องชื่อ 'address'
        };

        // 2. สร้าง URL พร้อม User ID
        const url = `http://localhost:5000/api/v1/Agaya/address/${currentUser._id}/addresses`;
        
        console.log("Sending POST to:", url);
        console.log("With data:", requestData);

        try {
            // 3. ยิง API แบบ POST
            const response = await axios.post(url, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                alert('บันทึกที่อยู่ใหม่สำเร็จ!');
                setShowAddForm(false); // ปิดฟอร์ม
                fetchAddresses();      // โหลดข้อมูลทั้งหมดใหม่
            }

        } catch (err) {
            console.error("Failed to add address:", err.response?.data || err.message);
            alert('เกิดข้อผิดพลาด: ' + (err.response?.data?.message || 'ไม่สามารถบันทึกที่อยู่ได้'));
        }
    };

    const handleUpdateAddress = async(formDataFromForm) => {
        console.log("กำลังอัปเดตที่อยู่");
        const token = localStorage.getItem('authToken');
        if (!token || !editingAddress?._id) {
            alert('ข้อมูลไม่พร้อมสำหรับอัปเดต กรุณาลองอีกครั้ง');
            return;
        }
        const requestData = {
            name: formDataFromForm.fullName,
            phoneNumber: formDataFromForm.phoneNumber,
            address: formDataFromForm.addressLine1
        };

        const url = `http://localhost:5000/api/v1/Agaya/address/addresses/${editingAddress._id}`;
        console.log(`Sending PUT to: ${url}`);
        console.log("with data:", requestData);
        
        try {
            const response = await axios.put(url, requestData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            if (response.data.success) {
                alert('อัปเดตที่อยู่สำเร็จ');
                setEditingAddress(null); //leave editing session
                fetchAddresses();
            }
        } catch (err) {
            console.error("Failed to update address:", err.response?.data || err.message);
            alert('เกิดข้อผิดพลาดในการอัปเดตที่อยู่');
        }
    }

    const handleDeleteAddress = async(addressId) => {
        if (!addressId) {
            alert('ไม่พบ ID ของที่อยู่ ไม่สามารถลบได้');
            return;
        }

        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?')) {
            console.log("กำลังลบที่อยู่...", addressId);

            try {
                const token = localStorage.getItem('authToken');
                const url = `http://localhost:5000/api/v1/Agaya/address/addresses/${addressId}`;
            
                await axios.delete(url, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                alert('ลบที่อยู่สำเร็จแล้ว');
                fetchAddresses();
            } catch (err) {
                console.log("ลบที่อยู่ล้มเหลว:", err);
                alert('เกิดข้อผิดพลาดในการลบที่อยู่');
            }
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    const isFormVisible = showAddForm || editingAddress != null;

    return (
        <div className="bg-white p-8 rounded-md shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-gray-800">ที่อยู่ของฉัน</h1>
            </div>

            {!isFormVisible && (
                <button onClick={() => setShowAddForm(true)}
                    className="!bg-red-700 text-white font-semibold py-2 px-5 w-30 h-10 rounded-md hover:bg-red-700 flex items-center justify-center">
                        เพิ่มที่อยู่ใหม่
                </button>
            )}

            {isFormVisible ? (
                <AddAddressForm
                    initialData={editingAddress}
                    onSave={editingAddress ? handleUpdateAddress : handleSaveAddress}
                    onCancel={() => {
                        setShowAddForm(false);
                        setEditingAddress(null);
                    }}
                />
            ) : (
                <AddressList 
                    addresses={addresses} 
                    onEdit={(address) => setEditingAddress(address)}
                    onDelete={handleDeleteAddress}
                />
            )}
        </div>
    );
}

export default Address;