

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { adminCliamService } from "../../services/admin/claimSerive"



export const adminCliamController = {


    getAllClaimRequests: async (req: any, res: Response) => {
        try {
            const userId = req.user._id; // Assuming user ID is stored in req.user
            const { search, status, limit = 10, page = 1 } = req.query;

            const result = await adminCliamService.getAllClaimRequests( {
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
            const result = await adminCliamService.getClaimDetailsByID(claimId);
            handleResponse.handleSuccess(res, result, "Claim fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },

    updateClaimStatus: async (req: Request, res: Response) => {
        try {
            const { claimId } = req.params;

            const data = {
                status: req.body.status,
                attachedImgs: req.body.attachedImgs || "",
                assignedto: req.body.assignedto || "",
                checkingRemarks: req.body.checkingRemarks


            }

            const result = await adminCliamService.updateCliamStatus(claimId, data);
            handleResponse.handleSuccess(res, result, "Claim status updated successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
}