import React from 'react';
import {useNavigate} from 'react-router-dom';
import {BsCheckCircleFill} from "react-icons/bs";
import './ChangePasswordSuccess.css';

function ChangePasswordSuccess() {
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/signin');
    };

    return (
        <div class="flex flex-col relative">

            <main>
                <div className="form-container">
                    <div className="form-card text-center">
                        <div className="success-icon">
                            <BsCheckCircleFill size={70} />
                        </div>

                        <h2 className="form-title">ตั้งรหัสผ่านใหม่สำเร็จแล้ว</h2>

                        <p className="success-message">
                            เปลี่ยนรหัสผ่านบัญชีนี้สำเร็จ
                        </p>
                        <p className="success-submessage">
                            คุณจะย้ายไปล็อกอินเข้าสู่ระบบภายใน 3 วินาที
                        </p>

                        <button className="submit-button" onClick={handleConfirm}>
                            ตกลง
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ChangePasswordSuccess;