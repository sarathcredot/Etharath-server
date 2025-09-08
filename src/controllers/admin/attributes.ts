


import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { attributesService } from "../../services/admin/attributesServices"



export const attributesController = {


    addAttributes: async (req: Request, res: Response) => {


        try {


            const result = await attributesService.addAttribute(req.body)
            handleResponse.handleSuccess(res, result, "Attribute added successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getAttributes: async (req: Request, res: Response) => {

        try {

            const result = await attributesService.getAttributes()
            handleResponse.handleSuccess(res, result, "Find attribute successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    deleteAttribute: async (req: Request, res: Response) => {

        try {

            const result = await attributesService.deleteAttribute(req.body)
            handleResponse.handleSuccess(res, result, "Attribute deleted successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);
        }

    }

}