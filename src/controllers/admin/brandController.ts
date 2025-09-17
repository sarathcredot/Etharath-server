

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { BrandServiceByAdmin } from "../../services/admin/brandService"


export const brandControllerByAdmin = {


    getAllBrand: async (req: Request, res: Response) => {

        try {

            const { search,
                status,
                limit = 10,
                page = 1 } = req.query

            const result = await BrandServiceByAdmin.getAllBrands({
                search,
                status,
                limit: Number(limit),
                page: Number(page)
            })
            console.log("res", result)
            handleResponse.handleSuccess(res, result, "all brand find successfully", 200)

        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500)
        }


    },

    createBrand: async (req: Request, res: Response) => {

        try {

            const result = await BrandServiceByAdmin.createBrand(req.body)

            handleResponse.handleSuccess(res, result, "brand created successfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },
    getBrandById: async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            const result = await BrandServiceByAdmin.getBrandsByID(id)
            handleResponse.handleSuccess(res, result, "brand find successfully", 200)

        } catch (error: any) {
            handleResponse.handleError(res, "", error, 500)
        }


    },


    updateBrandDetails: async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            const result = await BrandServiceByAdmin.updateBrandDetails(id, req.body)
            handleResponse.handleSuccess(res, result, "brand updated successfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    activeControllBrandDetails: async (req: Request, res: Response) => {

        try {

            const { id } = req.params
            const { isActive } = req.body



            const result: any = await BrandServiceByAdmin.activeControllBrandDetails(id, isActive)

            console.log("result", result)

            handleResponse.handleSuccess(res, result, result.message, 200)


        } catch (error: any) {

            console.log("error", error)

            handleResponse.handleError(res, "", error, 500)

        }

    },

    deleteBrand: async (req: Request, res: Response) => {

        try {

            const { id } = req.params
            const result: any = await BrandServiceByAdmin.deleteBrand(id)
            handleResponse.handleSuccess(res, result, "brand deleted successfully ", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }

    },

    getAllProductsByBarandId: async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            const result = await BrandServiceByAdmin.getAllProductsByBarandId(id)

            handleResponse.handleSuccess(res, result, "all product find successfully", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }



}