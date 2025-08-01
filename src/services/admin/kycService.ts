
import { Kyc } from "../../models/kyc"
import { User } from "../../models/user";
import { Schema, model, Document, ObjectId } from 'mongoose';
import { KycDetails } from "../../types/userTypes"
import { VERIFY_STATUS } from "../../utils/constants"



export const adminKycService = {

    getUserKycDetails: async (createdBy: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const checkExistKyc = await Kyc.findOne({ createdBy: createdBy })

                if (!checkExistKyc) {

                    throw new Error("You haven't added any KYC details")
                }

                resolve(checkExistKyc)


            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    createKyc: async (data: KycDetails) => {


        return new Promise(async (resolve, reject) => {

            try {

                const checkExistKyc = await Kyc.findOne({ createdBy: data.createdBy })

                if (checkExistKyc) {

                    throw new Error("already attached kyc details")
                }

                const final = new Kyc({
                    createdBy: data.createdBy,
                    ...data.kycDetails,
                    kycStatus: "approved"
                })

                const result = await final.save()

                await User.findOneAndUpdate({ _id: data.createdBy }, {

                    $set: {
                        isActive: false
                    }
                },
                    { new: true }
                )

                resolve(result);

            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    updateKyc: async (data: KycDetails) => {

        return new Promise(async (resolve, reject) => {

            try {
                const checkExistKyc = await Kyc.findOne({ createdBy: data.createdBy })

                if (!checkExistKyc) {

                    throw new Error("can't find any KYC details")
                }

                const result = await Kyc.findOneAndUpdate(
                    { createdBy: data.createdBy },
                    { $set: { ...data.kycDetails } },
                    { new: true }
                )

                resolve(result)


            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    kycVerification: async (data: { userId: ObjectId, status: string }) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Kyc.findOneAndUpdate({ createdBy: data.userId }, {

                    $set: {
                        kycStatus: data.status
                    },

                },
                    { new: true }
                )

                // when admin kyc status change update user active filed
                if (data.status === VERIFY_STATUS.APPROVED) {

                    await User.findOneAndUpdate({ _id: result?.createdBy }, {

                        $set: {
                            isVerified: VERIFY_STATUS.APPROVED
                        }
                    },
                        { new: true }
                    )
                } else if (data.status === VERIFY_STATUS.PENDING) {

                    await User.findOneAndUpdate({ _id: result?.createdBy }, {

                        $set: {
                            isVerified: VERIFY_STATUS.PENDING

                        }
                    },
                        { new: true }
                    )
                } else {
                    await User.findOneAndUpdate({ _id: result?.createdBy }, {

                        $set: {
                            isVerified: VERIFY_STATUS.REJECTED

                        }
                    },
                        { new: true }
                    )

                }

                resolve({
                    data: result,
                    message: `${data.status} this kyc `
                })


            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    deleteKyc: async (userId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Kyc.findOneAndDelete({ createdBy: userId })

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }

        })
    }


}