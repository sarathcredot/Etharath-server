

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { retailerClaimService } from "../../services/retailer/claimService"


export const retailerClaimController = {


    requestClaim: async (req: any, res: Response) => {
        try {
            const claimData = req.body; // Claim data from request body
            const result = await retailerClaimService.requestClaim(claimData);
            handleResponse.handleSuccess(res, result, "Claim requested successfully", 201);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },

    getAllClaimRequests: async (req: any, res: Response) => {
        try {
            const userId = req.user._id; // Assuming user ID is stored in req.user
            const { search, status, limit = 10, page = 1 } = req.query;

            const result = await retailerClaimService.getAllClaimRequests(userId, {
                search,
                status,
                limit: Number(limit),
                page: Number(page)
            });

            handleResponse.handleSuccess(res, result, "Claims fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    getClaimById: async (req: Request, res: Response) => {
        try {
            const { claimId } = req.params;
            const result = await retailerClaimService.getClaimDetailsByID(claimId);
            handleResponse.handleSuccess(res, result, "Claim fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },


}