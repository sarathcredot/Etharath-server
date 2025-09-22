

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
    price: {

        type: Number,
        required: true

    },

    purchased_Date: {

        type: Date,
        default: Date.now()
    },

    plan_start_date: {

        type: Date,
        default: Date.now()
    },

    plan_end_date: {

        type: Date,
        required: true
    },

    isActive: {

        type: Boolean,
        required: true
    }

},
    {
        timestamps: true
    }
)