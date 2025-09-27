

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { adminProductService } from "../../services/admin/productService"
import { AccessRequesType } from "../../types/product";




export const adminProductController = {



    addProduct: async (req: any, res: Response) => {

        try {

            const result = await adminProductService.addProduct(req?.user?._id, req.body)

            handleResponse.handleSuccess(res, result, "product created successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    updateProduct: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params
            const result = await adminProductService.updateProduct(proId, req.body)
            handleResponse.handleSuccess(res, result, "product updated successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)


        }

    },

    getAllProducts: async (req: Request, res: Response) => {

        try {

            const { search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await adminProductService.getAllProduct({
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

    getProductsByID: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params

            const result = await adminProductService.getProductById(proId)

            handleResponse.handleSuccess(res, result, "Product fetched successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    getAllStocksByProdectId: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params

            const { search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await adminProductService.getAllStocksByProdectId(proId, {
                search,
                status,
                isSuspend,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Product stocks fetched successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)


        }

    },

    verifyProductStockById: async (req: Request, res: Response) => {

        try {

            const { proId, reqId } = req.params
            const { status } = req.body

            const result: any = await adminProductService.verifyProductStockById(proId, reqId, status)

            handleResponse.handleSuccess(res, result, result.message, 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    isSuspendProductStock: async (req: Request, res: Response) => {

        try {

            const { proId, reqId } = req.params
            const { isSuspend } = req.body

            const result: any = await adminProductService.isSuspendProductStock(proId, reqId, isSuspend)

            handleResponse.handleSuccess(res, result, result.message, 200);


        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500)

        }

    },



    deleteProduct: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params

            const result = await adminProductService.deleteProduct(proId)
            handleResponse.handleSuccess(res, result, "Products deleted successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    verifyProduct: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params
            const { status } = req.body

            const result = await adminProductService.verifyProduct(proId, status)
            handleResponse.handleSuccess(res, result, `this product vefification is ${status}`, 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },


    isSuspendProduct: async (req: Request, res: Response) => {

        try {

            const { proId } = req.params
            const { status } = req.body

            const result: any = await adminProductService.isSuspendProduct(proId, status)
            handleResponse.handleSuccess(res, result, result.message, 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },


    //  add stock to a product. use vendor id

    addProductStockUserVendorId: async (req: any, res: Response) => {

        try {

            const { proId } = req.params

            const data: AccessRequesType = {

                productId: proId,
                location: req.body.location,
                price: req.body.price,
                requestedBy: req.body.requestedBy,
                stock: req.body.stock,
                warrantyPeriod: req.body.warrantyPeriod,
                type: req.body.type
            }

            const result = await adminProductService.addProductStockUseVendorId(data)

            handleResponse.handleSuccess(res, result, "stock added successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },


    // get productStockDetails by id


    getProductStockById: async (req: any, res: Response) => {

        try {

            const { reqId } = req.params
            const { proId } = req.params

            const result = await adminProductService.getProductStockDetialsById(proId, reqId)

            handleResponse.handleSuccess(res, result, "stock fetched successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },


    //  update stock details. 


    stockEditById: async (req: any, res: Response) => {

        try {

            const { reqId } = req.params

            const data = {
                stock: req.body.stock,
                location: req.body.location,
                price: req.body.price,
                warrantyPeriod: req.body.warrantyPeriod
                
            }

            const result = await adminProductService.updateProductStocksById(reqId, data)
            handleResponse.handleSuccess(res, result, "Product stock updated successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },


    // delete product stock


    deleteProductStockByID: async (req: Request, res: Response) => {

        try {

            const { reqId } = req.params
            const result = await adminProductService.deleteProductStockByID(reqId)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }

}