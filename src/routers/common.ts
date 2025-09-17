


import express from "express"
const router = express.Router()
import { handleResponse } from "../utils/responseHandler"
import { commonService } from "../services/commonService"
import { Request, Response } from 'express';




router.get("/blog", async (req: Request, res: Response) => {

    try {

        const result = await commonService.getAllBlogs()
        handleResponse.handleSuccess(res, result, "Blogs find successfully", 200);


    } catch (error: any) {

        handleResponse.handleError(res, "", error, 500);

    }
})




router.get("/offers", async (req: Request, res: Response) => {

    try {

        const result = await commonService.getAllOffers()
        handleResponse.handleSuccess(res, result, "Offers find successfully", 200);


    } catch (error: any) {

        handleResponse.handleError(res, "", error, 500);

    }

})





export default router;
