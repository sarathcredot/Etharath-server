
import { SubscriptionPlanType, ISubscriptionPlanType } from "../../types/subscription"
import { SubscriptionPlan } from "../../models/subscription"
import { GetallArrgu } from "../../types/product"





export const adminSubscriptionService = {

    // cretae a subscription plan

    createPlan: (data: ISubscriptionPlanType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const planExist = await SubscriptionPlan.findOne({ plan: data.plan })

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
    },

    // get plan by id

    getPlanDetailsById: (planId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await SubscriptionPlan.findById(planId)

                if (!result) {

                    throw new Error("Plan not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    // update plan details by id

    UpdatePlanDetailsById: (planId: any, data: ISubscriptionPlanType) => {

        return new Promise(async (resolve, reject) => {

            try {

                let planDetail = await SubscriptionPlan.findById(planId)

                if (!planDetail) {

                    throw new Error("No plans Found")
                }

                const existsplan: any = await SubscriptionPlan.find({ plan: data.plan })

                if (existsplan && existsplan._id.toString() !== planDetail._id.toString()) {

                    throw new Error("This plan already exists");
                }

                // update plan 

                planDetail.set({ ...data })

                await planDetail.save()

            } catch (error: any) {

                reject(error.message)
            }

        })

    },

    updateStatusByPlanId: (planId: any, status: boolean) => {

        return new Promise(async (resolve, reject) => {

            try {


                const result = await SubscriptionPlan.findByIdAndUpdate({ _id: planId },
                    {
                        $set: { isSuspend: status }
                    },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("Plan not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    deletePlanById: (planId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await SubscriptionPlan.findByIdAndDelete(planId)

                if (!result) {

                    throw new Error("Plan not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }

        })
    }




}