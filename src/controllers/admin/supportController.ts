

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { customerSupportService } from "../../services/admin/supportService"




export const customerSupportController = {


    getAllSupportRequest: async (req: Request, res: Response) => {

        try {

            const result = await customerSupportService.getAllSupportRequest()
            handleResponse.handleSuccess(res, result, "Find all support requests successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },


    getSupportRequestDetailsById: async (req: Request, res: Response) => {

        try {

            const { reqId } = req.params

            const result = await customerSupportService.getSupportRequestDetailsById(reqId)
            handleResponse.handleSuccess(res, result, "Find  support request successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },


}