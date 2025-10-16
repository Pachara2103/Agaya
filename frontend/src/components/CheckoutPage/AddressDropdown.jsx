import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddressDropdown({onAddressSelect}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserAddresses = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/v1/Agaya/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.data.data?._id) {
                    const userId = response.data.data._id;
                    const addressUrl = `http://localhost:5000/api/v1/Agaya/address/${userId}/addresses`;
                    const addressResponse = await axios.get(addressUrl, {
                        header: {Authorization: `Bearer ${token}`}
                    });
                    setAddresses(addressResponse.data);
                } else {
                    setAddresses([]);
                }
            } catch(err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserAddresses();
    }, []);

    const handleSelectChange = (event) => {
        const id = event.target.value;
        setSelectedAddressId(id);
        const selectedAddress = addresses.find(addr => addr._id === id);

        if (selectedAddress) {
            onAddressSelect(selectedAddress);
        }
    };

    if (isLoading) return <p className="text-gray-500">กำลังโหลดที่อยู่...</p>;
    if (addresses.length === 0) return null;

    return (
        <div className="mb-6">
            <select 
                value={selectedAddressId}
                onChange={handleSelectChange}
                className="w-full p-3 bg-gray-100 rounded-md focus:outline-none"
            >
                <option value="" disabled>เลือกที่อยู่ที่จัดส่ง</option>
                {addresses.map(address => (
                    <option key={address._id} value={address._id}>
                        {`${address.name} - ${address.address}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AddressDropdown;