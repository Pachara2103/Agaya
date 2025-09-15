import React from 'react';
import {Link} from 'react-router-dom';

function Address() {
    return (
        <>
            <div className="p-8">
                <div className="flex h-20 items-center pl-14 text-[18px] font-[600] text-black bg-gray-100">
                    ที่อยู่ของฉัน
                </div>
                <div className="mt-6">
                    <Link
                        to="/add-address-page"
                        className="bg-red-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-red-700 transition-colors"
                    >
                        เพิ่มที่อยู่ใหม่
                    </Link>
                </div>

                <div className="mt-8">

                </div>
            </div>
        </>
    );
}

export default Address;