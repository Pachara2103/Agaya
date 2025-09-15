import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddAddressForm({onSave, onCancel}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        addressLine1: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 border p-6 rounded-md">
            <div className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้รับ</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
                </div>
                <div>
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                    <textarea name="addressLine1" rows="4" value={formData.addressLine1} onChange={handleChange} required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={onCancel} className="!bg-gray-500 text-gray-800 py-2 px-6 rounded-md w-30 h-10 flex items-center justify-center">
                    ยกเลิก
                </button>
                <button type="submit" className="!bg-teal-500 text-white py-2 px-6 rounded-md w-30 h-10 flex items-center justify-center">
                    ยืนยัน
                </button>
            </div>
        </form>
    );
};

export default AddAddressForm;