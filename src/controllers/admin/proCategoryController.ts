

import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';
import { proCategoryService } from "../../services/admin/proCategoryService"




export const proCategoryController = {


    addCategory: async (req: Request, res: Response) => {

        try {

            const { proCategory } = req.body
            const result = await proCategoryService.addCategory(proCategory)
            handleResponse.handleSuccess(res, result, "Category added successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getAllCategory: async (req: Request, res: Response) => {

        try {

            const result = await proCategoryService.getAllCategorys()
            handleResponse.handleSuccess(res, result, "Find categorys  successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);


        }
    },

    deleteCategory: async (req: Request, res: Response) => {

        try {

            const { proCategory } = req.body
            const result = await proCategoryService.deleteCategory(proCategory)
            handleResponse.handleSuccess(res, result, "Category deleted successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);


        }
    }
}