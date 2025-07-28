

import { Claim } from "../../models/claim";
import { ClaimReqType, UpdateClaimStstus } from "../../types/claim";
import { Order } from "../../models/order"
import { ClaimStatus, OrderStatus } from "../../utils/constants"
import { GetallArrgu } from "../../types/product"
import mongoose from "mongoose";




export const salesAgentClaimService = {


    getAllAssignedMyClaims: async (userId: any, data: GetallArrgu) => {


        return new Promise(async (resolve, reject) => {
            try {

                const query: any = {
                    salesAgentId: new mongoose.Types.ObjectId(userId)
                };

                if (data.status) {
                    query.status = data.status;
                }

                if (data.search) {
                    query.claimId = { $regex: data.search, $options: "i" };
                }

                const skip = (data.page - 1) * data.limit;
                const [claims, total] = await Promise.all([

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
                                    orderId: "$orderDetails.orderId",
                                    vendorId: "$orderDetails.vendorId",
                                    userId: "$orderDetails.userId",
                                    productName: "$orderDetails.productName",
                                    quantity: "$orderDetails.quantity"
                                }
                            }
                        },
                        { $skip: skip },
                        { $limit: data.limit }
                    ]),
                    Claim.countDocuments(query)
                ]);

                resolve({
                    result: claims,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Claims fetched successfully",
                });

            } catch (error) {

                reject(error);
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

    updateCliamStatus: async (claimId: any, data: UpdateClaimStstus) => {
        return new Promise(async (resolve, reject) => {
            try {


                const claimData = await Claim.findById(claimId)

                if (!claimData) {
                    throw new Error("Claim not found");
                }

                if (!data.checkingRemarks) {

                    throw new Error("add remark")
                }


                const updateData: any = { status: data.status, checkingRemarks: data.checkingRemarks };

                if (data.status !== ClaimStatus.CANCELLED && data.salesAgentAttchedImgUrls?.length === 0) {

                    throw new Error("please attach stock images")
                }

                if (data.status === ClaimStatus.VERIFIED) {

                    if (data.salesAgentAttchedImgUrls?.length === 0) {

                        throw new Error("add stock images")
                    }

                    updateData.salesAgentAttchedImgUrls = data.salesAgentAttchedImgUrls
                    updateData.verifiedData = new Date()


                }

                if (data.status === ClaimStatus.COMPLETED) {

                    if (claimData.status !== ClaimStatus.APPROVED) {

                        throw new Error("you cant update this claim status to completed")
                    }

                    updateData.completedDate = new Date()
                }

                if (data.status === ClaimStatus.CANCELLED) {

                    updateData.cancelledDate = new Date()
                }

                const updatedClaim = await Claim.findByIdAndUpdate(claimId, updateData, { new: true });

                resolve({
                    updatedClaim,
                    message: `Claim status updated to ${data.status}`,

                });

            } catch (error: any) {

                reject(error.message);
            }
        });
    }







}

