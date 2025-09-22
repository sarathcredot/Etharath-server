

import { Schema, ObjectId, model } from "mongoose"
import { UserSubscriptionType } from "../types/subscription"





const UserSubscriptionSchema = new Schema<UserSubscriptionType>({

    subId: {

        type: String,
        required: true
    },
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
    purchase_Data: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
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


