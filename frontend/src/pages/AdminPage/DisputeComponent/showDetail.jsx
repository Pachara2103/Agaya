export const showDetail = (disputeId, username, customerId, orderId, products, reason) => {
    const productList = Array.isArray(products) ? products : []; 
    
    return (
        <>
            <div className="flex flex-col gap-2 min-h-30 bg-[#f8f8f8ff] text-black p-4">
                
                <div><span className="font-[600]">Dispute id :</span> {disputeId}</div>
                <div><span className="font-[600]">Customer :</span> {username} <span className="text-[10px]">(Id : {customerId})</span></div>
                <div><span className="font-[600]">Order id :</span> {orderId}</div>
                <div><span className="font-[600]">Reason :</span> {reason}</div>

                <div className="mt-1 border-gray-300 pt-2">
                    
                    <div className="grid grid-cols-3 font-[600] text-sm pb-1 border-b border-gray-400">
                        <div>Product Id</div>
                        <div>Product</div>
                        <div className="text-right">Amount</div> 
                    </div>
                    
                    {productList.map((p, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm py-1 border-b border-gray-200">

                            <div>{p.productId?._id || 'N/A'}</div>
                            <div>{p.productId?.productName || `Sample product ${index + 1}`}</div>
                            <div className="text-right">{p.quantity || 0}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
// Bank Old showDetail
// #f8f8f8ff
// const showDetail = (disputeId, username, orderId, products, reason) => {
//   console.log("hehe", products)
//   return (
//     <>
//       <div className="flex flex-col gap-2 min-h-30 bg-[#f8f8f8ff] text-black p-4">
//         <div>{"Dispute ID: " + disputeId}</div>
//         <div>{"customer: " + username}</div>
//         <div>{"Order ID: " + orderId}</div>
//         <div>{"Product: " + products}</div>
//         <div>{"Product ID: "}</div>
//         <div>{"Reason: " + reason}</div>
//       </div>
//     </>
//   );
// };