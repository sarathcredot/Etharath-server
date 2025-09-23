

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { adminSubscriptionService } from "../../services/admin/subscription"



export const adminSubscriptionController = {


    createPlan: async (req: Request, res: Response) => {

        try {

            const result = await adminSubscriptionService.createPlan(req.body)

            handleResponse.handleSuccess(res, result, "Subscription plan created successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },

    getAllPlans: async (req: Request, res: Response) => {

        try {
            const { search,
                status,
                isSuspend,
                role,
                limit = 10,
                page = 1 } = req.query

            const result = await adminSubscriptionService.getAllPlan({
                limit: Number(limit),
                page: Number(page),
                search: search,
                role: String(role),
                status: status
            })

            handleResponse.handleSuccess(res, result, "Subscription plans find successfully", 200);




        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },

    getPlanDetailsById: async (req: Request, res: Response) => {

        try {

            const { planId } = req.params
            const result = await adminSubscriptionService.getPlanDetailsById(planId)

            handleResponse.handleSuccess(res, result, "Subscription plan find successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },

    updatePlanDetailsById: async (req: Request, res: Response) => {

        try {

            const { planId } = req.params
            const result = await adminSubscriptionService.UpdatePlanDetailsById(planId, req.body)

            handleResponse.handleSuccess(res, result, "Subscription plan updated successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }

    },

    updatePlanStatusById: async (req: Request, res: Response) => {

        try {

            const { planId } = req.params
            const { status } = req.body

            const result = await adminSubscriptionService.updateStatusByPlanId(planId, status)

            handleResponse.handleSuccess(res, result, "Subscription plan status successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, 500, error);



        }
    },

    deletePlanById: async (req: Request, res: Response) => {

        try {
            const { planId } = req.params

            const result = await adminSubscriptionService.deletePlanById(planId)

            handleResponse.handleSuccess(res, result, "Subscription plan deleted successfully", 200);




        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },


    getPlanUnderAllActiveOrders: async (req: Request, res: Response) => {

        try {

            const { planId } = req.params

            const {
                search,
                limit = 10,
                page = 1 } = req.query

            const result = await adminSubscriptionService.getPlanUnderAllActiveOrders(planId, {

                limit: Number(limit),
                page: Number(page),
                search: search,

            })

            handleResponse.handleSuccess(res, result, "Subscription plan orders find successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, 500, error);
        }

    },


    getSubScriptionOrderDetailsById: async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params

            const result = await adminSubscriptionService.getSubScriptionOrderDetailsById(orderId)

            handleResponse.handleSuccess(res, result, "Subscription plan order find successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },


    updateSubscriptionOrderExpiryDate: async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params
            const { date } = req.body

            const result = await adminSubscriptionService.updateSubscriptionOrderExpiryDate(orderId, date)

            handleResponse.handleSuccess(res, result, "Subscription plan order expiry Ddate updated successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    },

    getAllSubscriptionPurchaseTransactions: async (req: Request, res: Response) => {

        try {

            const {
                search,
                filter,
                limit = 10,
                page = 1
            } = req.query



            const result = await adminSubscriptionService.getAllSubscriptionPurchaseTransactions({

                search,
                filter: typeof filter === "string" ? filter : undefined,
                limit: Number(limit),
                page: Number(page)
            })

            handleResponse.handleSuccess(res, result, "Subscription plan transactions find successfully", 200);



        } catch (error: any) {

            handleResponse.handleError(res, 500, error);

        }
    }




}