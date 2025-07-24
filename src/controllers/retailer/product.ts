

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import {vendorProductService} from "../../services/retailer/product"




export const retailerProductController={



    getAllProducts: async (req: Request, res: Response) => {
        try {
            const { search, page, limit } = req.query;
            const result = await vendorProductService.getAllProduct({
                search,
                page: Number(page),
                limit: Number(limit)
            });
            handleResponse.handleSuccess(res, result);
        } catch (error:any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    getProductsByID: async (req: Request, res: Response) => {
        try {
            const { proId } = req.params;
            const result = await vendorProductService.getProductByID(proId);
            handleResponse.handleSuccess(res, result, "Product fetched successfully", 200);
        } catch (error:any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    productStockDetailsById: async (req: Request, res: Response) => {
        try {
            const { proId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const result = await vendorProductService.productStockDetailsById(proId, Number(page), Number(limit));
            handleResponse.handleSuccess(res, result, "Product stock details fetched successfully", 200);
        } catch (error:any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    }


}