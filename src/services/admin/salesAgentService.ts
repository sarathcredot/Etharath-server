
import { User } from "../../models/user"
import { USER_ROLES } from "../../utils/constants"
import { UserReqType } from "../../types/userTypes"
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


}

