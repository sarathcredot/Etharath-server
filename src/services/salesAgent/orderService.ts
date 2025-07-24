

import { get } from "http"
import { Order } from "../../models/order"
import { OrderType } from "../../types/order"
import { GetallArrgu } from "../../types/product"
import mongoose from "mongoose"



export const salesAgentOrderService = {


    getAllMyAssignedOrders: (userId: any, { search, status, page, limit }: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                let query: any = { assignedToSalesAgent: new mongoose.Types.ObjectId(userId) }

                if (search) {
                    query.$or = [
                        { orderId: { $regex: search, $options: 'i' } },
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
                            $skip: skip
                        },
                        {
                            $limit: limit
                        },
                        {
                            $sort: { createdAt: -1 }
                        }
                    ]),
                    Order.countDocuments(query)
                ])

                resolve({
                    result: orders,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "Orders fetched successfully",

                })

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

    updateOrderStatus: (orderId: any, status: string) => {
        return new Promise(async (resolve, reject) => {
            try {


                const updateFields: any = {
                    status: status
                };


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