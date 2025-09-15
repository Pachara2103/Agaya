import React from 'react';

function AddressList({addresses}) {
    if (addresses.length === 0) {
        return <p className="text-gray-500 mt-4">ยังไม่มีที่อยู่ที่บันทึกไว้</p>;
    }

    return (
        <div className="space-y-4 mt-6">
            {addresses.map((address) => (
                <div key={address.id} className="border p-4 rounded-md flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{address.fullName}</p>
                        <p className="text-gray-600 text-sm">{address.phoneNumber}</p>
                        <p className="text-gray-600 text-sm">{address.addressLine1}</p>
                    </div>
                    <div>
                        <button className="text-blue-500 hover:underline text-sm">แก้ไข</button>
                        <button className="text-red-500 hover:underline text-sm ml-4">ลบ</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddressList;