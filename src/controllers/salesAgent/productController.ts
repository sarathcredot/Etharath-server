


import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { salesAgentProductService } from "../../services/salesAgent/productService"




export const salesAgentProductController = {



    getAllProducts: async (req: Request, res: Response) => {
        try {
            const { search, limit = 10,
                page = 1 } = req.query;
            const result = await salesAgentProductService.getAllProduct({
                search,
                page: Number(page),
                limit: Number(limit)
            });
            handleResponse.handleSuccess(res, result);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    getProductsByID: async (req: Request, res: Response) => {
        try {
            const { proId } = req.params;
            const result = await salesAgentProductService.getProductByID(proId);
            handleResponse.handleSuccess(res, result, "Product fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    productStockDetailsById: async (req: Request, res: Response) => {
        try {
            const { proId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const result = await salesAgentProductService.productStockDetailsById(proId, Number(page), Number(limit));
            handleResponse.handleSuccess(res, result, "Product stock details fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    }


}