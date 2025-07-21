
import {handleResponse} from "../../utils/responseHandler"
import { Request, Response } from 'express';
import {adminAuthService} from "../../services/admin/authService"


export const adminAuthController = {



    register:async (req: Request, res: Response) => {

        try {


        const result = await adminAuthService.register(req.body);

        handleResponse.handleSuccess(res,result, "Admin registered successfully", 201);


        } catch (error:any) {

            handleResponse.handleError(res, "", error, 500);
        }

    }

}



