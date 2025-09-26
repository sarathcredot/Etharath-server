
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
    }





}