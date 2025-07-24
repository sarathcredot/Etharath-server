

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { vendorOrderService } from "../../services/vender/orderService"



export const vendorOrderController = {


    getAllMyOrders: async (req: any, res: Response) => {

        try {

            const {
                search,
                status,
                limit = 10,
                page = 1

            } = req.query

            const result = await vendorOrderService.getAllMyOrders(req.user._id, {
                search,
                status,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "order fetched successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },
    getOrderById: async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params

            const result = await vendorOrderService.getOrderById(orderId)

            handleResponse.handleSuccess(res, result, "Order fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    updateOrderStatus: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const { status , assignedTo } = req.body;

            const result = await vendorOrderService.updateOrderStatus(orderId, status, assignedTo);
            handleResponse.handleSuccess(res, result, "Order status updated successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },

}