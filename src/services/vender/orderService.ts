

import { Order } from "../../models/order"
import { OrderType } from "../../types/order"
import { Product, ProductStockVender } from "../../models/product"
import { GetallArrgu, } from "../../types/product"
import { VERIFY_STATUS } from "../../utils/constants"




export const vendorOrderService = {

    getAllMyOrders: (userId: any, { search, status, page, limit }: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {


            try {

                let query: any = { vendorId: userId }

                if (search) {
                    query.$or = [
                        { orderId: { $regex: search, $options: 'i' } },
                        { status: { $regex: search, $options: 'i' } },
                    ];
                }

                if (status) {
                    query.status = status
                }

                const skip = (page - 1) * limit;

                const [orders, total] = await Promise.all([
                    Order.aggregate([
                        {
                            $match: query
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "productDetails"
                            }
                        },
                        {
                            $lookup: {
                                from: "brand",
                                localField: "productDetails.brand",
                                foreignField: "_id",
                                as: "brandDetails"
                            }
                        },
                        {
                            $unwind: "$brandDetails"
                        },
                        {
                            $unwind: "$productDetails"
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
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ]),
                    Order.countDocuments(query)
                ]);

                resolve({

                    result: orders,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "Orders fetched successfully",

                });






            } catch (error: any) {

                reject(error.message)

            }
        })

    },

    getOrderById: (orderId: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.aggregate([

                    {
                        $match: { _id: orderId }
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "productId",
                            foreignField: "_id",
                            as: "productDetails"
                        }
                    },
                    {
                        $unwind: "$productDetails"
                    },
                    {
                        $lookup: {
                            from: "brand",
                            localField: "productDetails.brand",
                            foreignField: "_id",
                            as: "brandDetails"
                        }
                    },
                    {
                        $unwind: "$brandDetails"
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
                    }

                ])
                if (!order) {
                    throw new Error("Order not found");
                }
                resolve(order[0]);
            } catch (error: any) {
                reject(error.message);
            }
        });
    },

    updateOrderStatus: (orderId: any, status: string, assignedTo: any) => {
        return new Promise(async (resolve, reject) => {
            try {


                const updateFields: any = {
                    status: status
                };

                if (status === "in-progress") {

                    if (!assignedTo) {
                        throw new Error("Assigned to sales agent is required for in-progress status");
                    }

                    updateFields.assignedToSalesAgent = assignedTo;
                }

                const updatedOrder = await Order.findByIdAndUpdate(orderId, {

                    $set: updateFields
                },
                    {
                        new: true,
                    }
                );
                if (!updatedOrder) {
                    throw new Error("Order not found");
                }
                resolve(updatedOrder);
           
            } catch (error: any) {

                reject(error.message);

            }
        });
    }


}