import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {FaEye, FaEyeSlash, FaArrowLeft, FaCheck, FaTimes} from 'react-icons/fa';
import Cookies from 'js-cookie'

function SetNewPasswordPage() {
    // State Management
    const navigate = useNavigate();
    const location = useLocation();
    const oldPassword = location.state?.oldPassword;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        lower: false,
        upper: false,
        number: false,
        length: false,
        match: false
    });

    useEffect(() => {
        if (!oldPassword) {
            console.log("ไม่พบรหัสผ่านเดิม กรุณาเริ่มจากขั้นตอนแรก");
            navigate('/change-password-form');
        }
    }, [oldPassword, navigate]);

    useEffect(() => {
        setValidations({
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            length: password.length >= 8,
            match: password && password === confirmPassword
        });
    }, [password, confirmPassword]);

    const handleBack = async (event) => {
        navigate('/change-password-form');
    }

    const handleConfirm = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const token = Cookies.get("token");
        if (!token) {
            setError("Token ไม่ถูกต้อง");
            setIsLoading(false);
            return;
        }

        const requestData = {
            oldPassword: oldPassword,
            newPassword: password
        };

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            await axios.put(
                'http://localhost:5000/api/v1/Agaya/auth/change-password', 
                requestData,
                config
            );

            console.log('Password updated successfully');
            setIsLoading(false);
            navigate('/change-password-success');
        } catch (err) {
            setIsLoading(false);
            if (err.response) {
                if (err.response.status === 401) setError('รหัสผ่านเดิมไม่ถูกต้อง');
                else if (err.response.status === 400) setError('รหัสผ่านใหม่ไม่ถูกต้องตามเงื่อนไข');
                else {
                    setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
                }
            } else {
                setError('ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้');
            }
        }
    };

    return (
        <div class="flex flex-col relative">
            <main>
                <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
                    <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-[420px]">
                        <div className="card-header">
                            <button className="flex bg-transparent border-none text-2xl cursor-pointer text-gray-500 w-10 h-5  items-center justify-center" 
                             onClick={handleBack}>
                                <FaArrowLeft />
                            </button>
                        </div>

                        <h2 className="text-2xl font-semibold mb-1 text-gray-800">ตั้งรหัสผ่าน</h2>
                        <p className="text-gray-600 mb-6">ตั้งรหัสผ่านใหม่</p>

                        <div className="relative w-full mb-4">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base focus:outline-none focus:border-teal-400"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={() => setShowPassword(!showPassword)} 
                             className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative w-full mb-4">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base focus:outline-none focus:border-teal-400"
                                placeholder="ยืนยันรหัสผ่าน"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                            <ul className="space-y-2 text-left text-sm mb-5">
                                <li className="flex items-center">
                                    <span className={`w-6 ${validations.lower ? 'text-green-500' : 'text-gray-400'}`}>
                                        {validations.lower ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span className={`${validations.lower ? 'text-gray-800' : 'text-gray-400'}`}>
                                        ต้องมีตัวพิมพ์เล็ก อย่างน้อย 1 ตัว (a-z)
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <span className={`w-6 ${validations.upper ? 'text-green-500' : 'text-gray-400'}`}>
                                        {validations.upper ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span className={`${validations.upper ? 'text-gray-800' : 'text-gray-400'}`}>
                                        ต้องมีตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว (A-Z)
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <span className={`w-6 ${validations.number ? 'text-green-500' : 'text-gray-400'}`}>
                                        {validations.number ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span className={`${validations.number ? 'text-gray-800' : 'text-gray-400'}`}>
                                        ต้องมีตัวเลขอย่างน้อย 1 ตัว (0-9)
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <span className={`w-6 ${validations.length ? 'text-green-500' : 'text-gray-400'}`}>
                                        {validations.length ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span className={`${validations.length ? 'text-gray-800' : 'text-gray-400'}`}>
                                        ต้องมีความยาวขั้นต่ำ 8 ตัวอักษร
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <span className={`w-6 ${validations.match ? 'text-green-500' : 'text-gray-400'}`}>
                                        {validations.match ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span className={`${validations.match ? 'text-gray-800' : 'text-gray-400'}`}>
                                        รหัสผ่านทั้ง 2 ต้องเหมือนกัน
                                    </span>
                                </li>
                            </ul>

                        {error && <p className="text-red-700 bg-red-200 p-3 rounded text-center">
                            {error}
                        </p>}

                        <button className="w-full py-3 bg-teal-300 text-white rounded-md text-base font-bold cursor-pointer mt-3 hover:bg-teal-500 transition-colors" 
                         onClick={handleConfirm} disabled={isLoading}>
                            {isLoading ? 'กำลังบันทึก' : 'ถัดไป'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SetNewPasswordPage;