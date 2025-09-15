import {React, useState, useEffect} from 'react';
import axios from 'axios';
import AddressList from './AddressList.jsx';
import AddAddressForm from './AddAddressForm.jsx';
import {Link} from 'react-router-dom';

function Address() {
    const [addresses, setAddresses] = useState([]);
    const [isLoading, seteIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);

    const fetchAddresses = async() => {
        try {
            
        }
        catch (err) {
            setError('ไม่สามารถโหลดข้อมูลที่อยู่ได้');
        } finally {
            seteIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSaveAddress = async (newAddressData) => {
        console.log("กำลังบันทึกที่อยู่ใหม่", newAddressData);
        //this will POST

        setShowAddForm(false);
        fetchAddresses();
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="bg-white p-8 rounded-md shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-gray-800">ที่อยู่ของฉัน</h1>
                {!showAddForm && (
                    <button onClick={() => setShowAddForm(true)}
                        className="bg-red-500 text-white font-semibold py-2 px-5 w-30 h-10 rounded-md hover:bg-red-700 flex items-center justify-center">
                            เพิ่มที่อยู่ใหม่
                    </button>
                )}
            </div>

            {showAddForm ? (
                <AddAddressForm
                    onSave={handleSaveAddress}
                    onCancel={() => setShowAddForm(false)}
                />
            ) : (
                <AddressList addresses={addresses} />
            )}
        </div>
    );
}

export default Address;