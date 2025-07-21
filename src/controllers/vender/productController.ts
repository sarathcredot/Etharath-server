

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import {vendorProductService} from "../../services/vender/productService"









export const vendorProductController = {

    getAllProducts: async (req: Request, res: Response) => {

        try {

            const { 
                search,
                limit = 10,
                page = 1 } = req.query

            const result = await vendorProductService.getAllProduct({
                search,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Products fetched successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    getProductsByID: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params

            const result = await vendorProductService.getProductById(proId)

            handleResponse.handleSuccess(res, result, "Product fetched successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },


}
