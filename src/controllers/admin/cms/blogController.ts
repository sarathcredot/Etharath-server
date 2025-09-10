

import { handleResponse } from "../../../utils/responseHandler"
import { Request, Response } from 'express';
import { blogService } from "../../../services/admin/cms/blogService"



export const blogController = {

    addBlog: async (req: Request, res: Response) => {

        try {

            const result = await blogService.addBlog(req.body)
            handleResponse.handleSuccess(res, result, "Blog added successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }

    },

    getAllBlog: async (req: Request, res: Response) => {

        try {

            const {
                search,
                limit = 10,
                page = 1 } = req.query

            const result = await blogService.getAllBlogs({
                search,
                limit: Number(limit),
                page: Number(limit)
            })

            handleResponse.handleSuccess(res, result, "Find all blogs successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    deleteBlog: async (req: Request, res: Response) => {

        try {

            const { blogId } = req.params


            const result = await blogService.deleteBlog(blogId)

            handleResponse.handleSuccess(res, result, "Blog deleted successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getBlogDataById: async (req: Request, res: Response) => {

        try {

            const { blogId } = req.params


            const result = await blogService.getBlogDetailById(blogId)

            handleResponse.handleSuccess(res, result, "Find blog successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    updateBlogById: async (req: Request, res: Response) => {

        try {

            const { blogId } = req.params

            const result = await blogService.updateBlogById(blogId, req.body)

            handleResponse.handleSuccess(res, result, "Blog updated successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    }
}