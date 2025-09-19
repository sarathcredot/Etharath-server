

import { Blog } from "../models/blog"
import { Offers } from "../models/offers"
import { SubscriptionPlan } from "../models/subscription"
import { RoleType } from "../types/subscription"



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
    },

    // get all subscription plans. 


    getAllSubscriptionPlans: (role: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await SubscriptionPlan.find({ role: role })

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    }



}