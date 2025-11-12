import React from "react";
import AddAddressForm from "../ProfilePage/AddAddressForm";

function AddAddressModal({isOpen, onClose, onSave}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center item-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold mb-4">เพิ่มที่อยู่ใหม่</h2>

                <AddAddressForm
                    onSave={onSave}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
}

export default AddAddressModal;