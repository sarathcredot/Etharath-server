

import { Schema, model, Document, ObjectId } from 'mongoose';



const subOrdersSchema = new Schema({

    subId: {
        type: String,
        required: true
    },
    userId: {

        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    planId: {

        type: Schema.Types.ObjectId,
        ref: "SubscriptionPlan",
        required: true
    },
    plan_price: {

        type: Number,
        required: true

    },

    total_amount: {

        type: Number,
        required: true

    },

    purchased_Date: {

        type: Date,
        default: Date.now()
    },

    plan_start_date: {

        type: Date,
        default: Date
    },

    plan_end_date: {

        type: Date,
        required: true
    },

    plan_duration: {

        type: Number,
        required: true
    },

    isActive: {

        type: Boolean,
        required: true
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

},
    {
        timestamps: true
    }
)

export const SubOrder = model('SubscriptionOrder', subOrdersSchema);
