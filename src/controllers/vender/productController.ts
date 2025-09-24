

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { vendorProductService } from "../../services/vender/productService"
import { AccessRequesType } from "../../types/product"









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

    productAccessRequestByVender: async (req: any, res: Response) => {

        try {

            const { proId } = req.params

            const data: AccessRequesType = {

                productId: proId,
                location: req.body.location,
                price: req.body.price,
                requestedBy: req?.user?._id,
                stock: req.body.stock,
                warrantyPeriod: req.body.warrantyPeriod
            }

            const result = await vendorProductService.productAccessRequestByVender(data)

            handleResponse.handleSuccess(res, result, "Products request sent successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },





    getAllMyProduct: async (req: any, res: Response) => {

        try {

            const {
                search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await vendorProductService.getAllMyProduct(req.user._id, {
                search,
                status,
                isSuspend,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Products fetched successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getMyProductStockById: async (req: any, res: Response) => {


        try {

            const { reqId } = req.params

            const result = await vendorProductService.getMyProductStockById(reqId)

            handleResponse.handleSuccess(res, result, "stock fetched successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    isSuspendProductStock: async (req: any, res: Response) => {

        try {

            const { reqId } = req.params

            const { isSuspend } = req.body

            const result: any = await vendorProductService.isSuspendProductStock(reqId, isSuspend)

            handleResponse.handleSuccess(res, result, result.message, 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },
    stockEditById: async (req: any, res: Response) => {

        try {

            const { reqId } = req.params

            const data = {
                stock: req.body.stock,
                location: req.body.location,
                price: req.body.price
            }

            const result = await vendorProductService.stockEditById(reqId, data)
            handleResponse.handleSuccess(res, result, "Product stock updated successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },
    deleteProductStock: async (req: any, res: Response) => {

        try {

            const { reqId } = req.params

            const result = await vendorProductService.deleteProductStock(reqId)

            handleResponse.handleSuccess(res, result, "Product stock deleted successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }
}