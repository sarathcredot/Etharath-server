
import { KycDetails } from "../types/userTypes"
import { Kyc } from "../models/kyc"

export const kycService = {


    getKyc: async (createdBy: any) => {

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

                    throw new Error("you have already attached kyc details")
                }

                const final = new Kyc({
                    createdBy: data.createdBy,
                    ...data.kycDetails,
                    kycStatus: "pending"
                })

                const result = await final.save()

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

                    throw new Error("You haven't added any KYC details")
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

    deleteKyc: async (userId: any) => {

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