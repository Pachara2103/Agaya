import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaEye, FaEyeSlash, FaArrowLeft} from 'react-icons/fa';
import './SetNewPassword.css';

function SetNewPasswordPage() {
    // State Management
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        lower: false,
        upper: false,
        number: false,
        length: false,
        match: false
    });

    useEffect(() => {
        setValidations({
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            length: password.length >= 8,
            match: password && password === confirmPassword
        });
    }, [password, confirmPassword]);

    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/change-password-success');
    };

    return (
        <div class="flex flex-col relative">
            <main>
                <div className="form-container">
                    <div className="form-card">
                        <div className="card-header">
                            <button className="back-button"><FaArrowLeft /></button>
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
                            <li className={validations.lower ? 'valid' : 'invalid'}>ตัวพิมพ์เล็ก อย่างน้อย 1 ตัว (a-z)</li>
                            <li className={validations.upper ? 'valid' : 'invalid'}>ตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว (A-Z)</li>
                            <li className={validations.number ? 'valid' : 'invalid'}>ตัวเลขอย่างน้อย 1 ตัว (0-9)</li>
                            <li className={validations.length ? 'valid' : 'invalid'}>ความยาวขั้นต่ำ 8 ตัวอักษร</li>
                            <li className={validations.match ? 'valid' : 'invalid'}>รหัสผ่านทั้ง 2 ต้องเหมือนกัน</li>
                        </ul>

                        <button className="submit-button" onClick={handleConfirm}>
                            ถัดไป
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SetNewPasswordPage;