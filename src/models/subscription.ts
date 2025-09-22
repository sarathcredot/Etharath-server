

import { Schema, ObjectId, model } from "mongoose"
import { SubscriptionPlanType } from "../types/subscription"
import { boolean } from "zod"



// const subscriptionSchema = new Schema<SubscriptionPlanType>({


//     role: {
//         type: String,
//         enum: ['retailer', 'vendor'],
//         required: true
//     },
//     plan: {
//         type: String,
//         enum: ['standered', 'executive', 'corporate'],
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     currency: {
//         type: String,
//         default: 'AED'
//     },
//     duration: {
//         type: String,
//         enum: ['monthly', 'yearly'],
//         default: 'monthly'
//     },
//     features: [
//         {
//             type: String
//         }
//     ],
//     maxUsers: {
//         type: Number,
//         default: 1
//     },
//     maxBrands: {
//         type: Number
//     },
//     maxVendors: {
//         type: Number
//     },
//     maxSearchesPerDay: {
//         type: Number
//     },
//     extraUserCharge: {
//         type: Number
//     }, // For vendor corporate
//     extraBrandCharge: {
//         type: Number
//     }, // For vendor corporate
//     specialBadging: {
//         type: Boolean
//     },
//     accessAllProducts: {
//         type: Boolean
//     },
//     accessAllCustomers: {
//         type: Boolean
//     },
//     accessMarketData: {
//         type: Boolean
//     },
//     accessReports: {
//         type: String,
//         enum: ['none', 'limited', 'full'],
//         default: 'none'
//     },
//     accessClaimManagement: {
//         type: Boolean
//     },
//     isSuspend: {
//         type: Boolean,
//         default: false
//     }



// })


// export const SubscriptionPlan = model<SubscriptionPlanType>("SubscriptionPlan", subscriptionSchema)



const subscriptionSchema = new Schema({


    plan: {
        type: String,
        enum: ['standard', 'executive', 'corporate'],
        required: true
    },
    role: {
        type: String,
        enum: ['retailer', 'vendor'],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    duration: {
        type: String,
        enum: ['monthly', 'yearly'],
        default: 'monthly'
    },

    features: [
        {
            type: String
        }
    ],

    isSuspend: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    }
)


export const SubscriptionPlan = model<SubscriptionPlanType>("SubscriptionPlan", subscriptionSchema)

