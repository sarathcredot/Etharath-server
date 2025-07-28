
import { request } from "http"
import { Claim } from "../../models/claim";
import { ClaimReqType } from "../../types/claim";
import { Order } from "../../models/order"
import { ClaimStatus, OrderStatus } from "../../utils/constants"
import { GetallArrgu } from "../../types/product"
import mongoose from "mongoose";


export const retailerClaimService = {



    requestClaim: async (claimData: ClaimReqType) => {

        return new Promise(async (resolve, reject) => {

            try {

                // check this order status is deliveryed 

                const orderDetails = await Order.findOne({ _id: claimData.orderId })

                if (orderDetails?.status !== OrderStatus.DELIVERED) {

                    throw new Error("you cant't request claim for this order, because this order is not delivered yet")
                }

                // check this claim is already requested for this order

                const existingClaim = await Claim.findOne({ orderId: claimData.orderId, status: ClaimStatus.PENDING })

                if (existingClaim) {
                    throw new Error("Claim already requested for this order")
                }

                // check this claim product quantity is less than or equal to order product quantity

                if (claimData.claimProductQuantity > orderDetails.quantity) {

                    throw new Error("Claim product quantity is greater than your order product quantity")
                }

                // create claim



                const claim = new Claim({

                    ...claimData,
                    vendorId: orderDetails.vendorId,
                    orderId: `CLM-${Math.floor(100000 + Math.random() * 900000)}`

                });
                const result = await claim.save();
                resolve(result);

            } catch (error: any) {

                reject(error.message);
            }
        });
    },
    getAllClaimRequests: async (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {
            try {

                const query: any = {
                    userId: new mongoose.Types.ObjectId(userId)
                };

                if (data.status) {
                    query.status = data.status;
                }

                if (data.search) {
                    query.claimId = { $regex: data.search, $options: "i" };
                }

                const skip = (data.page - 1) * data.limit;
                const [cliams, total] = await Promise.all([

                    Claim.aggregate([

                        {
                            $match: query
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
                        {
                            $project: {
                                _id: 1,
                                orderId: 1,
                                status: 1,
                                reason: 1,
                                createdAt: 1,
                                orderDetails: {
                                    _id: "$orderDetails._id",
                                    orderNumber: "$orderDetails.orderNumber",
                                    totalAmount: "$orderDetails.totalAmount",
                                    status: "$orderDetails.status"
                                }
                            }
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

                    Claim.countDocuments(query)
                ])

                resolve({

                    result: cliams,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Claims fetched successfully",

                })

            } catch (error: any) {

                reject(error.message);
            }
        });
    },

    getClaimDetailsByID: async (claimId: any) => {

        return new Promise(async (resolve, reject) => {
            try {

                const claimDetails = await Claim.aggregate([

                    {
                        $match: { _id: new mongoose.Types.ObjectId(claimId) }
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
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            status: 1,
                            reason: 1,
                            createdAt: 1,
                            orderDetails: {
                                _id: "$orderDetails._id",
                                orderNumber: "$orderDetails.orderNumber",
                                totalAmount: "$orderDetails.totalAmount",
                                status: "$orderDetails.status"
                            }
                        }
                    }
                ]);

                resolve(claimDetails[0]);

            } catch (error) {

                reject(error);
            }
        });


    },









}