

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { adminSalesAgentService } from "../../services/admin/salesAgentService";



export const adminSalesAgentController = {

    createSalesAgent: async (req: any, res: Response) => {

        const data = {
            userName: req.body.userName,
            email: req.body?.email,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            imgUrl: req.body?.imgUrl
        }

        try {

            const result = await adminSalesAgentService.createSalesAgent(req.body.vendorId, data);

            handleResponse.handleSuccess(res, result, "Sales agent created successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);
        }
    },

    getAllSalesAgents: async (req: any, res: Response) => {


        try {
            const result = await adminSalesAgentService.getAllSalesAgents();

            handleResponse.handleSuccess(res, result, "Sales agents fetched successfully", 200);
        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);

        }
    },

    isSuspendSalesAgent: async (req: any, res: Response) => {
       
        const { salesAgentId, isSuspend } = req.body;

        try {
            const result:any = await adminSalesAgentService.isSuspendSalesAgent(salesAgentId, isSuspend);

            handleResponse.handleSuccess(res, result, result.message, 200);
        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);

        }
    }

    




}
