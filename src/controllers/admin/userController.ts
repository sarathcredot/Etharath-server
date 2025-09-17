

import { Request, Response } from 'express';
import { handleResponse } from "../../utils/responseHandler"
import { adminUserService } from "../../services/admin/userService";
import { adminVendorServices } from "../../services/admin/vendorService"
import { adminRetailerServices } from "../../services/admin/retailerService"



export const adminUserController = {


    getAllUsers: async (req: any, res: Response) => {
        try {
            const venders = await adminUserService.getAllUsers(req.query.role);
            handleResponse.handleSuccess(res, venders, `Fetched all ${req.query.role} successfully`, 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500);
        }
    },



    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const vender = await adminUserService.getUserById(id);
            handleResponse.handleSuccess(res, vender, "Fetched details successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500);
        }
    },
    updateUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const vender = await adminUserService.updateUserById(id, req.body);
            handleResponse.handleSuccess(res, vender, "Updated details successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500);
        }
    },
    isSuspendUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const vender = await adminUserService.isSuspendUserById(id, req.body);
            handleResponse.handleSuccess(res, vender, "updated successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500);
        }
    },
    createAuser: async (req: Request, res: Response) => {
        try {
            const vender = await adminUserService.createUser(req.body);
            handleResponse.handleSuccess(res, vender, "Created successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },


    getVendorAllStocks: async (req: Request, res: Response) => {


        try {

            const { vendorId } = req.params

            const { search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await adminVendorServices.getVendorAllStocks(vendorId, {
                status,
                search,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Vendor stocks find successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error.message, 500);

        }
    },

    getVendorAllOrders: async (req: Request, res: Response) => {


        try {

            const { vendorId } = req.params

            const { search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await adminVendorServices.getVendorAllOrders(vendorId, {
                status,
                search,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Vendor orders find successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error.message, 500);

        }
    },

    getRetailerAllOrders: async (req: Request, res: Response) => {

        try {

            const { vendorId } = req.params

            const { search,
                status,
                isSuspend,
                limit = 10,
                page = 1 } = req.query

            const result = await adminRetailerServices.getRetailerAllOrders(vendorId, {
                status,
                search,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Retails orders find successfully", 200);


        } catch (error: any) {


            handleResponse.handleError(res, "", error.message, 500);

        }
    }


}
