
import { ObjectId } from "mongoose"
import { Blog } from "../../../models/blog"
import { IBlogType } from "../../../types/blog"
import { GetallArrgu } from "../../../types/product"




export const blogService = {


    addBlog: (data: IBlogType) => {

        return new Promise(async (resolve, reject) => {

            try {


                const final = new Blog({

                    title: data.title,
                    content: data.content,
                    imgUrl: data.imgUrl,
                    date: data.date,
                    tags: data.tags
                })

                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getAllBlogs: ({ search, limit, page }: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {


                let query = {}
                const skip = (page - 1) * limit;


                const [blogs, total] = await Promise.all([

                    Blog.aggregate([

                        {
                            $match: query
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }


                    ]),
                    Blog.countDocuments(query)

                ])



            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    deleteBlog: (blogId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Blog.findByIdAndDelete({ _id: blogId })

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    getBlogDetailById: (blogId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Blog.findById({ _id: blogId })

                if (!result) {

                    throw new Error("blog not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    updateBlogById: (blogId: any, data: IBlogType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Blog.findByIdAndUpdate({ _id: blogId },

                    { ...data },
                    { new: true }
                )

                if (!result) {

                    throw new Error("blog not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    updateBlogStatus: (blogId: any, status: boolean) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Blog.findByIdAndUpdate({ _id: blogId },
                    {
                        $set: {
                            status: status
                        }
                    },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("Blog not found")
                }
                

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    }





}