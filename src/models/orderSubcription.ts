

import { Schema, ObjectId, model } from "mongoose"
import { UserSubscriptionType } from "../types/subscription"





const UserSubscriptionSchema = new Schema<UserSubscriptionType>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    planId: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    additionalUsers: {
        type: Number,
        default: 0
    },
    additionalBrands: {
        type: Number,
        default: 0
    },
    userSearchCount: {

        type: Number
    },
    userSearchResetDate: {
        type: Date
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        method: String,
        transactionId: String,
        paidOn: Date
    }
});
