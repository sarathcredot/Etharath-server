


import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { vendorSalesAgentService } from "../../services/vender/salesAgentService";

export const vendorSalesAgentController = {


    getSalesAgents: async (req: any, res: Response) => {

        const vendorId = req.user?.id;

        try {

            const result = await vendorSalesAgentService.getSalesAgents(vendorId);

            handleResponse.handleSuccess(res, result, "Sales agents fetched successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);
        }

    },

    createSalesAgent: async (req:any, res: Response) => {

        const data = req.body;
        const vendorId = req.user?.id;

        try {

            const result = await vendorSalesAgentService.createSalesAgent(data,vendorId);

            handleResponse.handleSuccess(res, result, "Sales agent created successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);
        }





    },

    getSalesAgentById: async (req: Request, res: Response) => {
        
        const {agentId} = req.params;

        try {

            const result = await vendorSalesAgentService.getSalesAgentById(agentId);

            handleResponse.handleSuccess(res, result, "Sales agent fetched successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);
        }

    },

    isSuspendSalesAgent: async (req: Request, res: Response) => {

        const { agentId } = req.params;
        const { isSuspend } = req.body;

        try {

            const result: any = await vendorSalesAgentService.isSuspendSalesAgent(agentId, isSuspend);

            handleResponse.handleSuccess(res, result, result.message, 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);
        }

    }
}











