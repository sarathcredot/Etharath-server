
import { SubOrder } from "../../models/subscriptionOrdes"
import { SubscriptionPlan } from "../../models/subscription"
import { User } from "../../models/user"





export const subscriptionService = {

    purchaseSubscriptionPlan: (userId: any, planId: any, duration: number) => {

        return new Promise(async (resolve, reject) => {

            try {

                // check is this plan valid or not 

                const planDetails = await SubscriptionPlan.findById(planId)

                if (!planDetails || planDetails.isSuspend === true) {

                    throw new Error("This subcription plan not found ")
                }

                // check have any active plans in user account 

                const userDetails = await User.findById(userId)

                if (userDetails && userDetails.active_plan === null) {

                    // add selected plan in user account 

                    // create a subscription order

                    const subId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
                    const startDate = new Date();
                    const endDate = new Date(startDate);
                    endDate.setMonth(endDate.getMonth() + duration); // add months


                    const createSubOrder = new SubOrder({
                        subId,
                        userId,
                        planId,
                        price: planDetails.price,
                        plan_start_date: startDate,
                        plan_end_date: endDate,
                        total_amount: planDetails.price * duration,
                        paymentStatus: "paid"
                    })

                    const orderResult = await createSubOrder.save()

                    // add this plan id in user account 

                    const result = await User.findByIdAndUpdate({ _id: userId }, {

                        $set: {
                            active_plan: orderResult._id
                        }
                    },
                        { new: true }
                    )


                    resolve(result)


                } else {

                    // check is  user active plan and slected plan same 

                    const orderDetails = await User.aggregate([
                        {
                            $match: { _id: userId }
                        },
                        {
                            $lookup: {
                                from: "subscriptionOrder",
                                foreignField: "_id",
                                localField: "active_plan",
                                as: "activePlanOrderDetails"
                            }
                        },

                    ])

                    if (orderDetails && orderDetails[0].planId === planId) {

                        throw new Error(" This plan already active your account  ")
                    }



                    // find user curent active planOrder and update this order active status to false

                    await SubOrder.findOneAndUpdate({ userId: userId }, {

                        $set: {
                            isActive: false
                        }
                    },
                        { new: true }
                    )



                    // add selected plan in user account 

                    // create a subscription order

                    const subId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
                    const startDate = new Date();
                    const endDate = new Date(startDate);
                    endDate.setMonth(endDate.getMonth() + duration); // add months


                    const createSubOrder = new SubOrder({
                        subId,
                        userId,
                        planId,
                        price: planDetails.price,
                        plan_start_date: startDate,
                        plan_end_date: endDate,
                        total_amount: planDetails.price * duration,
                        paymentStatus: "paid"
                    })

                    const orderResult = await createSubOrder.save()

                    // add this plan id in user account 

                    const result = await User.findByIdAndUpdate({ _id: userId }, {

                        $set: {
                            active_plan: orderResult._id
                        }
                    },
                        { new: true }
                    )


                    resolve(result)


                }

            } catch (error: any) {

                reject(error.message)
            }

        })
    },

    getAllSubscriptionOrders: (userId: any, search: any) => {

        return new Promise(async (resolve, reject) => {


            try {

                const query: any = { userId: userId }

                if (search) {

                    query.$or = [
                        { subId: { $regex: search, $options: 'i' } },
                    ];
                }

                const result = await SubOrder.find(query)

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }

        })


    },

    getSubscriptionOrderDetailsById: ( orderId: any) => {

        return new Promise(async (resolve, reject) => {

            try {


                const result = await SubOrder.findById(orderId)

                if (!result) {

                    throw new Error("Subscription order not found")
                }

                resolve(result)


            } catch (error: any) {

                reject(error.message)
            }
        })


    }


}