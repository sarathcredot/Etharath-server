
import { adminDashboardServices } from "../../services/admin/dashboardService"
import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from "express"


export const adminDashboardController = {



    getTotalAndThisMonthCount: async (req: Request, res: Response) => {

        try {

            const result = await adminDashboardServices.getTotalAndThisMonthCount()

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getTotalCountBasedTimeLine: async (req: Request, res: Response) => {

        try {

            const { filter = "month", role = "vendor", order = false } = req.query

            const result = await adminDashboardServices.getTotalCountBasedTimeLine({

                filter: String(filter),
                role: String(role),
                order: Boolean(order)
            })

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)



        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getTopDetails: async (req: Request, res: Response) => {

        try {


            const { filter = "vendor" } = req.query

            const result = await adminDashboardServices.getTopDetails({

                filter: String(filter)
            })

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getRevenueDetails: async (req: Request, res: Response) => {

        try {

            const result = await adminDashboardServices.getRevenueDetails()

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getRevenuedataGraphical: async (req: Request, res: Response) => {

        try {

            const { filter = "month" } = req.query

            const result = await adminDashboardServices.getRevenuedataGraphical(String(filter))

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },


    getSubScriptionCountDataByRole: async (req: Request, res: Response) => {

        try {

            const { role } = req.query

            const result = await adminDashboardServices.getSubScriptionCountDataByRole(String(role))
            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500)

        }

    },

    getRevenuedataGraphicalByRole: async (req: Request, res: Response) => {

        try {

            const { filter, role } = req.query

            const result = await adminDashboardServices.getRevenuedataGraphicalByRole(String(filter), String(role))
            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    getRevenuedatabymonthByRole: async (req: Request, res: Response) => {

        try {

            const { role } = req.query

            const result = await adminDashboardServices.getRevenuedatabymonthByRole(String(role))

            handleResponse.handleSuccess(res, result, "Data find succssfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }




}