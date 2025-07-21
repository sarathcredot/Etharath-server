
import { Request, Response } from 'express';
import { handleResponse } from "../utils/responseHandler"
import { kycService } from "../services/kycService"




export const kycController = {

    getKyc: async (req: any, res: Response) => {

        try {


            const result = await kycService.getKyc(req.user._id)

            handleResponse.handleSuccess(res, result, "find kyc details succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    createKyc: async (req: any, res: Response) => {


        try {

            const data = {
                createdBy: req?.user?._id,
                kycDetails: req.body
            }

            const result = await kycService.createKyc(data)

            handleResponse.handleSuccess(res, result, "kyc created succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    updateKyc: async (req: any, res: Response) => {

        try {
            const data = {
                createdBy: req?.user?._id,
                kycDetails: req.body
            }

            const result = await kycService.updateKyc(data)

            handleResponse.handleSuccess(res, result, "kyc updated succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    deleteKyc: async (req: any, res: Response) => {

        try {

            const result = await kycService.deleteKyc(req.user._id)

            handleResponse.handleSuccess(res, result, "kyc deleted succssfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }

}