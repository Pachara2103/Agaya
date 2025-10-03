import React from 'react';

function AddressList({addresses = [], onEdit}) {
    if (addresses.length === 0) {
        return <p className="text-gray-500 mt-4">ยังไม่มีที่อยู่ที่บันทึกไว้</p>;
    }

    return (
        <div className="space-y-4 mt-6">
            {addresses.map((address) => (
                <div key={address.id} className="border p-4 rounded-md flex justify-between items-start">
                    <div className="flex-grow pr-4">
                        <div className="grid grid-cols-5 gap-x-4 items-center">
                            <p className="text-black font-semibold col-span-2">{address.name}</p>
                            <p className="text-gray-600 text-sm col-span-3">{address.phoneNumber}</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-gray-600 text-sm">{address.address}</p>
                        </div>
                    </div>

                    <div>
                        <button-white onClick={() => onEdit(address)} className="text-blue-500 hover:underline text-sm w-30 h-10 flex items-center justify-center">
                            แก้ไข
                        </button-white>
                        <button-white className="text-red-500 hover:underline text-sm w-30 h-10 flex items-center justify-center">
                            ลบ
                        </button-white>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddressList;