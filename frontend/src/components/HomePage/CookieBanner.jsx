import React from 'react';
import './CookieBanner.css';

function CookieBanner({onAccept, onDecline}) {
    return (
        <div className="cookie-banner-container">
            <div className="cookie-banner-content">
                <p className="cookie-text">
                    เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของผู้ใช้ การใช้เว็บไซต์นี้ต่อไปถือว่าคุณยอมรับการใช้คุกกี้ของเรา
                </p>
                <div className="cookie-buttons">
                    <button className="cookie-button accept" onClick={onAccept}>
                        ยอมรับ
                    </button>
                    <button className="cookie-button decline" onClick={onDecline}>
                        ปฏิเสธ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieBanner;