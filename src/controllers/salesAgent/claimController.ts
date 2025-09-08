

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { salesAgentClaimService } from "../../services/salesAgent/claimService"




export const salesAgentClaimController = {


    getAllAssignedMyClaims: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;


            const {
                search,
                limit = 10,
                page = 1 } = req.query;

            const result = await salesAgentClaimService.getAllAssignedMyClaims(userId, {

                search,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result);


        } catch (error: any) {

            handleResponse.handleError(res, "", error.message, 500);


        }
    },

    getClaimDetailsByID: async (req: any, res: Response) => {


        try {

            const { claimId } = req.params;

            const result = await salesAgentClaimService.getClaimDetailsByID(claimId)

            handleResponse.handleSuccess(res, result);



        } catch (error: any) {

            handleResponse.handleError(res, "", error.message, 500);


        }
    },


    updateCliamStatus: async (req: any, res: Response) => {

        try {

            const { claimId } = req.params;



            const data = {
                status: req.body.status,
                salesAgentAttchedImgUrls: req.body.salesAgentAttchedImgUrls,
                checkingRemarks: req.body.checkingRemarks

            }


            const result = await salesAgentClaimService.updateCliamStatus(claimId, data)

            handleResponse.handleSuccess(res, result);


        } catch (error: any) {

            handleResponse.handleError(res, "", error.message, 500);

        }
    }


}