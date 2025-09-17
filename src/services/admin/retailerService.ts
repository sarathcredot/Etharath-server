

import { ProductType, GetallArrgu, AccessRequesType, ProductStockVenderType } from "../../types/product"
import { Product, ProductStockVender } from "../../models/product"
import { Order } from "../../models/order"



export const adminRetailerServices = {

    getRetailerAllOrders: (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                const query: any = { userId: userId }

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