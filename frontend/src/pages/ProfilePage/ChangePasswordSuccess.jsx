import React from 'react';
import {useNavigate} from 'react-router-dom';
import {BsCheckCircleFill} from "react-icons/bs";

function ChangePasswordSuccess() {
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/signin');
    };

    return (
        <div class="flex flex-col relative">

            <main>
                <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
                    <div className="bg-white py-[40px] px-[50px] rounded-lg shdaow-lg w-full max-w-[420px] text-center">
                        <div className="text-[#4CAF50] mb-5 flex justify-center">
                            <BsCheckCircleFill size={70} />
                        </div>

                        <h2 className="text-2xl font-semibold mb-5">ตั้งรหัสผ่านใหม่สำเร็จแล้ว</h2>

                        <p className="text-base text-gray-800 mb-8">
                            เปลี่ยนรหัสผ่านบัญชีนี้สำเร็จ
                        </p>

                        <button className="w-full py-3 bg-[#80cbc4] text-white rounded-md text-base font-bold cursor-pointer transition-colors duration-300 hover:bg-[#4db6ac]" 
                         onClick={handleConfirm}>
                            ตกลง
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ChangePasswordSuccess;