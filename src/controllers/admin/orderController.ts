

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { adminOrderService } from "../../services/admin/orderService"
import { number } from "zod";



export const adminOrderController = {

    getAllOrders: async (req: Request, res: Response) => {

        try {

            const {
                search,
                status,
                limit = 10,
                page = 1

            } = req.query


            const result = await adminOrderService.getAllOrders({
                search,
                status,
                limit: Number(limit),
                page: Number(page)
            });
            handleResponse.handleSuccess(res, result, "Orders fetched successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);

        }

    },

    getOrderById: async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params

            const result = await adminOrderService.getOrderById(orderId)

            handleResponse.handleSuccess(res, result, "Order fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, 500, error.message);

        }
    },

    updateOrderStatus: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const { status, assignedTo } = req.body;

            const result = await adminOrderService.updateOrderStatus(orderId, status, assignedTo);
            handleResponse.handleSuccess(res, result, "Order status updated successfully", 200);
        } catch (error: any) {

            handleResponse.handleError(res, 500, error.message);

        }
    }


}