import React, {useState} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

function PasswordForm() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!password) {
            setError('กรุณากรอกรหัส');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = Cookies.get('token');
            if (!token) {
                setError("ไม่พบข้อมูลยืนยันตัวตน กรุณาเข้าสู่ระบบใหม่อีกรอบ");
                setIsLoading(false);
                return;
            }

            const url = 'http://localhost:5000/api/v1/Agaya/auth/verify-password';
            const requestData = {password: password};

            const response = await axios.post(url, requestData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("5555");

            if (response.data.success) {
                navigate('/set-new-password', {state: {oldPassword: password}});
            }
        } catch(err) {
            if (err.response && err.response.status === 401) {
                setError("รหัสผ่านเดิมไม่ถูกต้อง");
            } else {
                setError("เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน");
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/profile');
    };

    return (
        <div class="flex flex-col relative">

            <main>
                <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
                    {/* กล่องสีขาวที่ครอบฟอร์มทั้งหมด */}
                    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <div className="text-left mb-5">
                        <button className="flex bg-transparent border-none text-2xl cursor-pointer text-gray-500 w-10 h-5  items-center justify-center"
                         onClick={handleBack}>
                            <FaArrowLeft />
                        </button>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
                            ใส่รหัสผ่านเดิม
                        </h2>
                        <p className="form-subtitle"></p>

                        <div className="input-wrapper">
                            <input
                                type="password"
                                className="w-full py-3 px-4 mb-5 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-teal-400"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-700 bg-red-200 p-3 rounded text-center my-3">{error}</p>}

                        <button className="w-full h-10 bg-teal-400 text-white rounded-md font-bold transition-colors duration-300 hover:bg-teal-500" 
                         onClick={handleSubmit}
                         disabled={isLoading}
                        >
                            {isLoading ? "กำลังตรวจสอบ..." : "ถัดไป"}
                        </button>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}

export default PasswordForm;