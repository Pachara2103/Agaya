exports.calculatePagination = (totalItems, queryParams) => {
    let page = parseInt(queryParams.page) > 0 ? parseInt(queryParams.page) : 1;
    const limit = parseInt(queryParams.limit) > 0 ? parseInt(queryParams.limit) : 10;
    
    const totalPages = Math.ceil(totalItems / limit) || 1;
    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * limit;

    return { page, limit, totalPages, skip };
};

exports.getOrderDetailsPipeline = () => {
    return [
        {
            $lookup: {
                from: "contains",
                localField: "_id",
                foreignField: "orderId", 
                as: "contains",
            },
        },
        { $unwind: "$contains" },
        {
            $lookup: {
                from: "products",
                localField: "contains.productId", 
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
        {
            $lookup: {
                from: "vendors",
                localField: "vendorId",
                foreignField: "_id",
                as: "vendorDetails"
            }
        },
        {$unwind: "$vendorDetails" },
        {
            $group: {
                _id: "$_id",
                orderDate: { $first: "$orderDate" },
                customerId: { $first: "$customerId" },
                vendorId: { $first: "$vendorId" },
                storeName: { $first: "$vendorDetails.storeName" },
                orderTracking: { $first: "$orderTracking" }, 
                contains: {
                    $push: {
                        productId: "$product._id",
                        name: "$product.productName",
                        price: "$product.price",
                        quantity: "$contains.quantity",
                        image: "$product.image",
                        totalPrice: { $multiply: ["$product.price", "$contains.quantity"] },
                    },
                },
            },
        },
        {
            $addFields: { 
                orderTotal: { $sum: "$contains.totalPrice" } 
            },
        },
        { $sort: { orderDate: -1 } },
    ];
};