

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { subscriptionService } from "../../services/retailer/subscriptionService"




export const subcriptionController = {


    purchaseSubscriptionPlan: async (req: any, res: Response) => {

        try {

            const userId = req?.user?._id
            const { planId, duration } = req.body

            const result = await subscriptionService.purchaseSubscriptionPlan(userId, planId, duration)

            handleResponse.handleSuccess(res, result, "You have successfully purchased plan", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getAllSubscriptionOrders: async (req: any, res: Response) => {

        try {

            const userId = req?.user?._id
            const { search } = req.query

            const result = await subscriptionService.getAllSubscriptionOrders(userId, search)
            handleResponse.handleSuccess(res, result, " Find your all subscription orders successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    getSubscriptionOrderDetailsById: async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params

            const result = await subscriptionService.getSubscriptionOrderDetailsById(orderId)
            handleResponse.handleSuccess(res, result, " Find your subscription order successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }


}