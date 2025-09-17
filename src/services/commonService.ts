

import { Blog } from "../models/blog"
import { Offers } from "../models/offers"



export const commonService = {


    getAllOffers: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Blog.find()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getAllBlogs: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Offers.find()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    }

}