import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

function PasswordForm() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!password) {
            setError('กรุณากรอกรหัส');
            return;
        }

        navigate('/set-new-password', {state: {oldPassword: password}});
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

                        <button className="w-full bg-teal-400 text-white rounded-md font-bold transition-colors duration-300 hover:bg-teal-500" 
                         onClick={handleSubmit}>
                        ถัดไป
                        </button>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}

export default PasswordForm;