
import { ProductType, GetallArrgu, AccessRequesType, ProductStockVenderType } from "../../types/product"
import { Product, ProductStockVender } from "../../models/product"
import { Order } from "../../models/order"


export const adminVendorServices = {


    getVendorAllStocks: (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reejct) => {

            try {

                const query: any = { requestedBy: userId }

                if (data.search) {

                }

                if (data.status) {

                    query.isVerified = data.status
                }
                if (data.isSuspend) {

                    query.isSuspend = data.isSuspend
                }

                const skip = (data.page - 1) * data.limit;

                const [products, total] = await Promise.all([

                    ProductStockVender.aggregate([

                        {
                            $match: query
                        },

                        {
                            $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "product"

                            }
                        },

                        {
                            $unwind: "$product"
                        },
                        {
                            $lookup: {
                                from: "brands",
                                localField: "product.brand",
                                foreignField: "_id",
                                as: "brand"

                            }
                        },
                        {
                            $unwind: "$brand"
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: data.limit
                        }
                    ]),

                    ProductStockVender.countDocuments(query)


                ])


                resolve({
                    result: products,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Products fetched successfully",
                });




            } catch (error: any) {

                reejct(error.message)
            }

        })
    },

    getVendorAllOrders: (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                const query: any = { vendorId: userId }

                const skip = (data.page - 1) * data.limit;

                if (data.search) {

                    query.$or = [
                        { orderId: { $regex: data.search, $options: 'i' } },

                    ];
                }

                const [orders, total] = await Promise.all([

                    Order.aggregate([

                        {
                            $match: query
                        },

                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "userDetails"

                            }
                        },
                        {
                            $unwind: "$userDetails"
                        },

                        {
                            $lookup: {
                                from: "productStocksVender",
                                localField: "stockIdByVendor",
                                foreignField: "_id",
                                as: "stockDetails"

                            }
                        },

                        {
                            $unwind: "$stockDetails"
                        },


                        {
                            $lookup: {
                                from: "products",
                                localField: "stockDetails.productId",
                                foreignField: "_id",
                                as: "productDetails"

                            }
                        },

                        {
                            $unwind: "$productDetails"
                        },
                        {
                            $lookup: {
                                from: "brands",
                                localField: "productDetails.brand",
                                foreignField: "_id",
                                as: "brandDetails"

                            }
                        },
                        {
                            $unwind: "$brandDetails"
                        },

                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: data.limit
                        }

                    ]),

                    Order.countDocuments(query)
                ])

                resolve({
                    result: orders,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Order fetched successfully",
                });


            } catch (error: any) {

                reject(error.message)
            }
        })
    }



}