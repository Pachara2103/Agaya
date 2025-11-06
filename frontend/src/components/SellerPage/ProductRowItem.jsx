
import { FaTrash } from "react-icons/fa";

const ProductRowItem = ({ products, finalpriceProducts, setEditProduct, setPageSelected, handleDelete }) => {
    const formatDate = (date) => {
        const startdate = new Date(date);
        const thStartDate = new Date(startdate.getTime() + 7 * 60 * 60 * 1000);
        return (thStartDate.toISOString()).split('T')[0];
    }

    return (
        <div className="border-l border-r border-b rounded-b-lg">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className="flex flex-col sm:grid sm:grid-cols-13 gap-4 p-4 border-b-1 border-[#CCCCCC] last:border-b-1"  >

                    <div className="sm:col-span-4 flex items-center">
                        <img
                            src={product.image && product.image.length > 0 ? product.image[0] : "https://via.placeholder.com/80"}
                            alt={product.product_name}
                            className="w-16 h-16 object-contain mr-4 border p-1"
                        />
                        <span className="font-semibold text-gray-800"> {product.productName}   </span>
                    </div>

                    <div className="col-span-1 sm:flex sm:items-center sm:justify-center text-gray-700"> <span className="sm-display"> ยอดขาย: </span>N/A</div>
                    <div className="col-span-1 sm:col-span-2 sm:flex sm:items-center sm:justify-center text-gray-700"> <span className="sm-display"> ราคา: </span>  {finalpriceProducts[index]}  </div>
                    <div className="col-span-1 sm:flex sm:items-center sm:justify-center text-gray-700"> <span className="sm-display"> คลัง: </span>{product.stockQuantity}  </div>

                    <div className="sm:col-span-3 text-gray-500 sm:flex sm:items-center sm:justify-center w-full"  >
                        {product.promotion.active ? (
                            <>
                                <p className="mb-2">ลด <span className="text-red-500 font-bold">{product.promotion.promoDiscount}%</span></p>
                                {formatDate(product.promotion.startDate)}{" "} ถึง {formatDate(product.promotion.endDate)}
                            </>
                        ) : 'ไม่มีโปรโมชัน'}
                    </div>

                    <div className="sm:col-span-2 text-center sm:text-right flex items-center justify-center sm:justify-end">
                        <button className="button-white w-20"
                            onClick={() => {
                                setEditProduct(products[index]);
                                setPageSelected("edit");
                            }}                  >
                            แก้ไข
                        </button>
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="button-white w-20 ml-2 !text-red-500"
                        >
                            ลบ
                        </button>
                    </div>

                </div>
            ))}
        </div>

    );
}

export default ProductRowItem;