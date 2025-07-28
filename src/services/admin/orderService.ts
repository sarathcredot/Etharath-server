

import { Order } from "../../models/order"
import { GetallArrgu } from "../../types/product"




export const adminOrderService = {


    getAllOrders: (data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {


            try {

                const query: any = {}

                if (data.search) {

                    query.$or = [
                        { orderId: { $regex: data.search, $options: 'i' } },
                    ]
                }

                if (data.status) {

                    query.status = data.status
                }


                const skip = (data.page - 1) * data.limit;

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
                            $limit: data.limit

                        }
                    ]),
                    Order.countDocuments(query)
                ]);

                resolve({

                    result: orders,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
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
                    updateFields
                }

                if (status === "delivered") {
                    updateFields.deliveryDate = new Date();
                }
                if (status === "cancelled") {
                    updateFields.cancelledDate = new Date();
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




