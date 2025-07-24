

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { salesAgentOrderService } from "../../services/salesAgent/orderService"



export const salesAgentOrderController = {

    getAllMyAssignedOrders: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;
            const { search, status, page, limit } = req.query;

            const orders = await salesAgentOrderService.getAllMyAssignedOrders(userId, {
                search,
                status,
                page: Number(page) || 1,
                limit: Number(limit) || 10
            });

            handleResponse.handleSuccess(res, orders, " Assigned Orders fetched successfully", 200);

        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);

        }

    },

    getOrderById: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const result = await salesAgentOrderService.getOrderById(orderId);
            handleResponse.handleSuccess(res, result, "Order fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },

    updateOrderStatus: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const { status, assignedTo } = req.body;

            const result = await salesAgentOrderService.updateOrderStatus(orderId, status);
            handleResponse.handleSuccess(res, result, "Order status updated successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },





}