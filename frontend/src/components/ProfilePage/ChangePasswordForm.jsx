import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import './ChangePasswordForm.css';

function PasswordForm() {
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/set-new-password');
    };

    return (
        <div class="flex flex-col relative">
            

            <main>
                <div className="form-container">
                    {/* กล่องสีขาวที่ครอบฟอร์มทั้งหมด */}
                    <div className="form-card">
                        <div className="card-header">
                        {/* ในอนาคตเราจะใส่ icon ลูกศรกลับตรงนี้ */}
                        <button className="back-button"><FaArrowLeft /></button>
                        </div>

                        <h2 className="form-title">ใส่รหัสผ่านเดิม</h2>
                        <p className="form-subtitle"></p>

                        <div className="input-wrapper">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="submit-button" onClick={handleSubmit}>
                        ถัดไป
                        </button>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}

export default PasswordForm;