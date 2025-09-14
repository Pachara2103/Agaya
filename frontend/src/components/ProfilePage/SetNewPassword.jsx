import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {FaEye, FaEyeSlash, FaArrowLeft} from 'react-icons/fa';
import './SetNewPassword.css';

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

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError("Token ไม่ถูกต้อง");
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
                <div className="form-container">
                    <div className="form-card">
                        <div className="card-header">
                            <button className="back-button" onClick={handleBack}><FaArrowLeft /></button>
                        </div>

                        <h2 className="form-title">ตั้งรหัสผ่าน</h2>
                        <p className="form-subtitle">ตั้งรหัสผ่านใหม่</p>

                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input-field"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input-field"
                                placeholder="ยืนยันรหัสผ่าน"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <ul className="password-requirement">
                            <li className={validations.lower ? 'valid' : 'invalid'}>ต้องมีตัวพิมพ์เล็ก อย่างน้อย 1 ตัว (a-z)</li>
                            <li className={validations.upper ? 'valid' : 'invalid'}>ต้องมีตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว (A-Z)</li>
                            <li className={validations.number ? 'valid' : 'invalid'}>ต้องมีตัวเลขอย่างน้อย 1 ตัว (0-9)</li>
                            <li className={validations.length ? 'valid' : 'invalid'}>ต้องมีความยาวขั้นต่ำ 8 ตัวอักษร</li>
                            <li className={validations.match ? 'valid' : 'invalid'}>ต้องมีรหัสผ่านทั้ง 2 ต้องเหมือนกัน</li>
                        </ul>

                        {error && <p className="error-message">{error}</p>}

                        <button className="submit-button" onClick={handleConfirm} disabled={isLoading}>
                            {isLoading ? 'กำลังบันทึก' : 'ถัดไป'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SetNewPasswordPage;