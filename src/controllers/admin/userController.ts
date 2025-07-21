

import { Request, Response } from 'express';
import { handleResponse } from "../../utils/responseHandler"
import { adminUserService } from "../../services/admin/userService";



export const adminUserController = {


    getAllUsers: async (req: Request, res: Response) => {
        try {
            const venders = await adminUserService.getAllUsers(req.body.role);
            handleResponse.handleSuccess(res, venders, `Fetched all ${req.body.role} successfully`, 200);
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
            handleResponse.handleError(res, "", error, 500);
        }
    }
}
