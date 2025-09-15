import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddAddressPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        addressLine1: '',
        subDistrict: '',
        district: '',
        postalCode: ''
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
        console.log("Address data to be sent:", formData);
        alert("บันทึกที่อยู่สำเร็จ!");
        navigate(-1);
    };

    return (
        <div className="p-8">
            <h1 className="text-x1 font-semibold text-gray-800 pb-4 border-b">
                เพิ่มที่อยู่ใหม่
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-2">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>
                    
                    {/* Address Line 1 */}
                    <div className="md:col-span-2">
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่ (บ้านเลขที่, ถนน, หมู่บ้าน, อาคาร)</label>
                        <textarea name="addressLine1" id="addressLine1" rows="3" value={formData.addressLine1} onChange={handleChange} required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>

                    {/* Sub-district & District */}
                    <div>
                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700 mb-1">ตำบล/แขวง</label>
                        <input type="text" name="subDistrict" id="subDistrict" value={formData.subDistrict} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">อำเภอ/เขต</label>
                        <input type="text" name="district" id="district" value={formData.district} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>

                    {/* Province & Postal Code */}
                    <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">จังหวัด</label>
                        <input type="text" name="province" id="province" value={formData.province} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">รหัสไปรษณีย์</label>
                        <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400 text-black" />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={() => navigate(-1)}
                            className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors w-20 h-10">
                        ยกเลิก
                    </button>
                    <button type="submit"
                            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition-colors w-20 h-10">
                        บันทึกที่อยู่
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressPage;