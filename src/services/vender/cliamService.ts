

import { Claim } from "../../models/claim";
import { ClaimReqType } from "../../types/claim";
import { Order } from "../../models/order"
import { ClaimStatus, OrderStatus } from "../../utils/constants"
import { GetallArrgu } from "../../types/product"
import mongoose from "mongoose";




export const vendorCliamService = {


    getAllClaimRequests: async (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {
            try {

                const query: any = {
                    vendorId: new mongoose.Types.ObjectId(userId)
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

    updateCliamStatus: async (claimId: any, data: { status: string, assignedto?: any, checkingRemarks?: string, attachedImgs: string[] }) => {
        return new Promise(async (resolve, reject) => {
            try {

                if (!data.checkingRemarks) {

                    throw new Error("add remark")
                }

                const updateData: any = { status: data.status };



                if (data.status === ClaimStatus.IN_PROGRESS) {

                    if (!data.assignedto) {

                        throw new Error("please assign to a sales agent")
                    }


                    updateData.checkingRemarks = data.checkingRemarks
                    updateData.assignedToSalesAgent = data.assignedto
                    updateData.assignedDate = new Date()
                }



                if (data.status === ClaimStatus.REJECTED) {



                    updateData.rejectedDate = new Date();

                }



                if (data.status === ClaimStatus.APPROVED) {


                    updateData.approvedDate = new Date()
                }

                if (data.status === ClaimStatus.CANCELLED) {

                    updateData.cancelledDate = new Date()
                }

                if (data.status === ClaimStatus.VERIFIED) {

                    if (data.attachedImgs.length === 0) {

                        throw new Error("add stock images")
                    }

                    updateData.salesAgentAttchedImgUrls = data.attachedImgs
                    updateData.verifiedData = new Date()


                }

                if (data.status === ClaimStatus.COMPLETED) {

                    updateData.completedDate = new Date()
                }


                const updatedClaim = await Claim.findByIdAndUpdate({ _id: claimId },
                    {
                        $set: updateData
                    },
                    {
                        new: true
                    }
                )

                if (!updatedClaim) {

                    throw new Error("Claim not found");
                }

                resolve({
                    updatedClaim,
                    message: `Claim status updated to ${status}`,

                });

            } catch (error: any) {

                reject(error.message);
            }
        });
    }






}