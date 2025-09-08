

import { instantCourtService } from "../../services/retailer/instantCountService"
import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';



export const instantCourtController = {


    addCourt: async (req: Request, res: Response) => {

        try {


            const result = await instantCourtService.addCount(req.body)

            handleResponse.handleSuccess(res, result, "Instant court created successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);


        }
    },

    getCourt: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;

            const result = await instantCourtService.getInstantCourt(userId)

            handleResponse.handleSuccess(res, result, "Find Instant court successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);



        }
    }

}