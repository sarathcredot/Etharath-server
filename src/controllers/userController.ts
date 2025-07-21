

import { Request, Response } from 'express';
import { handleResponse } from "../utils/responseHandler"
import { userService } from "../services/userService"

export const userController = {


    getProfile: async (req: any, res: Response) => {

        try {


            const result = await userService.getProfile(req?.user?._id,)
            handleResponse.handleSuccess(res, result, "data find succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    updateProfile: async (req: any, res: Response) => {

        try {


            const result = await userService.updateProfile(req?.user?._id,req.body)
            handleResponse.handleSuccess(res, result, "profile updated succssfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }


}