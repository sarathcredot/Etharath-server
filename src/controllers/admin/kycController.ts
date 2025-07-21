

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from "express"
import { adminKycService } from "../../services/admin/kycService"

export const 
adminKycController = {



    getUserKycDetails: async (req: any, res: Response) => {

        try {

            const { userId } = req.params
            console.log("params", userId)
            const result = await adminKycService.getUserKycDetails(userId)
            handleResponse.handleSuccess(res, result, "find kyc details succssfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)
        }

    },
    createUserKycDetails: async (req: any, res: Response) => {

        try {

            const { userId } = req.params
            console.log("params", userId)
            const result = await adminKycService.createKyc(userId)
            handleResponse.handleSuccess(res, result, "cretae kyc succssfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)
        }

    },
    updateUserKycDetails: async (req: any, res: Response) => {

        try {
            const { userId } = req.params
            const data = {
                createdBy: userId,
                kycDetails: req.body
            }

            const result = await adminKycService.updateKyc(data)

            handleResponse.handleSuccess(res, result, "kyc updated succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },


    kycVerification: async (req: any, res: Response) => {

        try {

            const { userId } = req.params
            const data = {

                userId,
                status: req.body.status
            }

            const result: any = await adminKycService.kycVerification(data)
            handleResponse.handleSuccess(res, result.data, result.message, 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)
        }

    },

    deleteUserKycDetails: async (req: any, res: Response) => {

        try {
            const { userId } = req.params
            const result = await adminKycService.deleteKyc(userId)
            handleResponse.handleSuccess(res, result, "kyc deleted succssfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }
}




