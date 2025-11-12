import {useNavigate} from 'react-router-dom';
import {BsCheckCircleFill} from "react-icons/bs";

function OrderConfirmation() {
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/cart');
    };

    return (
        <div class="flex flex-col relative" id='place-order-success'>

            <main>
                <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
                    <div className="bg-white py-[40px] px-[50px] rounded-lg shdaow-lg w-full max-w-[420px] text-center">
                        <div className="text-[#4CAF50] mb-5 flex justify-center">
                            <BsCheckCircleFill size={70} />
                        </div>

                        <h2 className="text-2xl font-semibold mb-5">สั่งซื้อสินค้าสำเร็จ</h2>

                        <p className="text-base text-gray-800 mb-2">
                            สั่งซื้อสินค้าสำเร็จแล้ว
                        </p>
                        <p className="text-sm text-gray-600 mb-8">
                            กด "ตกลง" เพื่อดูสถานะคำสั่งซื้อ
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

export default OrderConfirmation;