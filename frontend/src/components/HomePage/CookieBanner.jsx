import React from 'react';

function CookieBanner({onAccept, onDecline}) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-slate-800/95 text-white p-5 z-50 shadow-lg animate-slide-up">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
                <p className="text-sm text-center md:text-left">
                    เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของผู้ใช้ การใช้เว็บไซต์นี้ต่อไปถือว่าคุณยอมรับการใช้คุกกี้ของเรา
                </p>
                <div className="flex gap-4 py-2 px-4 rounded-lg">
                    <button className="w-32 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-8 rounded-md transition-colors" 
                     onClick={onAccept}>
                        ยอมรับ
                    </button>
                    <button className="w-32 bg-transparent hover:bg-slate-600 border border-slate-500 text-slate-300 hover:text-white font-bold py-2 px-8 rounded-md transition-colors" 
                     onClick={onDecline}>
                        ปฏิเสธ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieBanner;