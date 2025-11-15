import {useState, useEffect} from "react";
import AddAddressModal from "./AddAddressModal";
import axios from "axios";
import Cookies from "js-cookie";

function AddressDropdown({onAddressSelect}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                const user = response.data.data;
                setCurrentUser(user);
                    
                if (response.data.data?._id) {
                    const userId = response.data.data._id;
                    const addressUrl = `http://localhost:5000/api/v1/Agaya/address/${userId}/addresses`;
                    const addressResponse = await axios.get(addressUrl, {
                        headers: {Authorization: `Bearer ${token}`}
                    });
                    const fetchedAddresses = addressResponse.data || [];
                    setAddresses(fetchedAddresses);

                    if (fetchedAddresses.length > 0 && !selectedAddressId) {
                        const firstAddress = fetchedAddresses[0];
                        setSelectedAddressId(firstAddress._id);
                        onAddressSelect(firstAddress);
                    }
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
    }, [selectedAddressId, onAddressSelect]);

    const handleSelectChange = (event) => {
        const id = event.target.value;
        setSelectedAddressId(id);
        const selectedAddress = addresses.find(addr => addr._id === id);

        if (selectedAddress) {
            onAddressSelect(selectedAddress);
        }
    };

    const handleSaveNewAddress = async (formDataFromForm) => {
        const token = Cookies.get('token');
        if (!token || !currentUser?._id) {
            alert("ข้อมูลผู้ใช้ไม่พร้อม ไม่สามารถบันทึกได้");
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

        const requestData = {
            name: formDataFromForm.fullName,
            phoneNumber: formDataFromForm.phoneNumber,
            address: formDataFromForm.addressLine1
        };

        const url = `http://localhost:5000/api/v1/Agaya/address/${currentUser._id}/addresses`;
        try {
            const response = await axios.post(url, requestData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            const newAddress = response.data.data;

            setIsModalOpen(false);
            setAddresses(prevAddresses => [...prevAddresses, newAddress]);
            setSelectedAddressId(newAddress._id);
            onAddressSelect(newAddress);
            alert("เพิ่มที่อยู่ใหม่สำเร็จ");
        } catch(err) {
            console.error("Failed to add address:", err);
            alert("เกิดข้อผิดพลาดในการเพิ่มที่อยู่");
        }
    };

    if (isLoading) return <p className="text-gray-500">กำลังโหลดที่อยู่...</p>;

    return (
        <div className="mb-6">
            <div className="flex items-center gap-4">
                <select 
                    value={selectedAddressId}
                    onChange={handleSelectChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none"
                >
                    {addresses.map(address => (
                        <option key={address._id} value={address._id}>
                            {`${address.name} - ${address.address}`}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-teal-500 text-white font-semibold cursor-pointer px-4 py-3 rounded-md hover:bg-teal-600 transition-colors whitespace-nowrap"
                >
                    + ที่อยู่ใหม่
                </button>
            </div>
            <AddAddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNewAddress}
            />
        </div>
    );
};

export default AddressDropdown;