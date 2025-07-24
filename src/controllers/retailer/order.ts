


import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { retailerOrderService } from "../../services/retailer/orderService"




export const retailerOrderController = {

    placeOrder: async (req: any, res: Response) => {
        try {
            const userId = req.user._id; // Assuming user ID is stored in req.user
            const orderData = req.body; // Order data from request body

            const result = await retailerOrderService.placeOrder(userId, orderData);
            handleResponse.handleSuccess(res, result, "Your order has been placed successfully", 201);

        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);

        }
    },
    getAllMyOrders: async (req: any, res: Response) => {
        try {
            const userId = req.user._id; // Assuming user ID is stored in req.user
            const { search, status, limit = 10, page = 1 } = req.query;

            const result = await retailerOrderService.getAllMyOrders(userId, {
                search,
                status,
                limit: Number(limit),
                page: Number(page)
            });

            handleResponse.handleSuccess(res, result, "Orders fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    getOrderById: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const result = await retailerOrderService.getOrderById(orderId);
            handleResponse.handleSuccess(res, result, "Order fetched successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    },
    cancelMyOrderById: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const result = await retailerOrderService.cancelMyOrderById(orderId);
            handleResponse.handleSuccess(res, result, "Order cancelled successfully", 200);
        } catch (error: any) {
            handleResponse.handleError(res, "", error.message, 500);
        }
    }


}