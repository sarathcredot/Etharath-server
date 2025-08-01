
import { SubscriptionPlanType } from "../../types/subscription"
import { SubscriptionPlan } from "../../models/subscription"
import { GetallArrgu } from "../../types/product"





export const adminSubscriptionService = {

    // cretae a subscription plan

    createPlan: (data: SubscriptionPlanType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const planExist = await SubscriptionPlan.findOne({ plan: data.plan, isSuspend: false })

                if (planExist) {

                    throw new Error("this plan already created")
                }

                const final = new SubscriptionPlan(data)

                const result = await final.save()

                resolve(result)


            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    // get all ubscription plan

    getAllPlan: (data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                let query: any = {};

                if (data.role) {

                    query.role = data.role
                }

                if (data.search) {

                    query.$or = [
                        { plan: { $regex: data.search, $options: 'i' } },
                    ];
                }

                const skip = (data.page - 1) * data.limit;


                const [plans, total] = await Promise.all([

                    SubscriptionPlan.find(query)
                        .skip(skip)
                        .limit(data.limit)
                        .sort({ createdAt: -1 }),

                    SubscriptionPlan.countDocuments(query)

                ])

            } catch (error: any) {

                reject(error.message)
            }
        })
    }


}