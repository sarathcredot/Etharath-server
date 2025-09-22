
import { User } from "../../models/user"
import { Order } from "../../models/order"
import { Claim } from "../../models/claim"
import { USER_ROLES } from "../../utils/constants"
import { UserReqType } from "../../types/userTypes"
import { GetallArrgu } from "../../types/product"
import mongoose from "mongoose"



export const adminSalesAgentService = {


    createSalesAgent: async (vendorId: any, data: UserReqType) => {


        return new Promise(async (resolve, reject) => {


            try {


                if (data.role !== USER_ROLES.SALES_EXECUTIVE) {
                    throw new Error("Invalid role selected ");
                }

                const existUser: any = await User.findOne({
                    $or: [
                        { email: data.email },
                        { phoneNumber: data.phoneNumber }
                    ]
                });

                if (existUser) {
                    throw new Error("User already exists with this email or phone number");
                }

                const final = new User({

                    ...data,
                    salesAgentOwner: vendorId
                })

                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })


    },

    getAllSalesAgents: async () => {

        return new Promise(async (resolve, reject) => {

            try {


                const result = await User.aggregate([

                    {
                        $match: {
                            role: USER_ROLES.SALES_EXECUTIVE
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "salesAgentOwner",
                            foreignField: "_id",
                            as: "vendorDetails"
                        }
                    },
                    {
                        $unwind: {
                            path: "$vendorDetails",
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ])

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    isSuspendSalesAgent: (salesAgentId: any, isSuspend: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salesAgent = await User.findByIdAndUpdate(salesAgentId, {
                    $set: {
                        isSuspend: isSuspend
                    }
                },
                    {
                        new: true
                    }
                )

                if (!salesAgent) {
                    throw new Error("Sales Agent not found");
                }

                resolve({
                    salesAgent,
                    message: isSuspend ? "Sales Agent suspended successfully" : "Sales Agent activated successfully"
                });

            } catch (error: any) {

                reject(error.message);

            }
        })
    },


    getAssignedOrders: (salesAgentId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                const query: any = { assignedToSalesAgent: salesAgentId }

                if (data.status) {

                    query.status = JSON.parse(data.status)
                }


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
    },


    getAssignedClaims: (salesAgentId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                const query: any = { assignedToSalesAgent: salesAgentId }

                if (data.status) {

                    query.status = JSON.parse(data.status)
                }


                const skip = (data.page - 1) * data.limit;

                if (data.search) {

                    query.$or = [
                        { claimId: { $regex: data.search, $options: 'i' } },

                    ];
                }


                const [claim, total] = await Promise.all([

                    Claim.aggregate([

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
                                from: "orders",
                                localField: "orderId",
                                foreignField: "_id",
                                as: "orderDetails"

                            }
                        },
                        {
                            $unwind: "$orderDetails"
                        },

                    ]),

                    Claim.countDocuments(query)



                ])


                resolve({
                    result: claim,
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

