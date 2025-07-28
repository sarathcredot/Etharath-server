

import { Schema, ObjectId, model } from "mongoose"
import { IclaimType } from "../types/claim"



const claimSchema = new Schema<IclaimType>({
    claimId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    claimProductQuantity: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    userAttchedImgUrls: {

        type: [String],
        required: true

    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "in-progress", "cancelled", "verified", "approved", "rejected", "completed"]
    },
    requestedDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: {
        type: Date,
    },
    rejectedDate: {
        type: Date
    },
    cancelledDate: {
        type: Date
    },
    completedDate: {
        type: Date
    },
    verifiedData: {
        type: Date
    },


    assignedToSalesAgent: {
        type: Schema.Types.ObjectId,
        ref: "User"

    },
    salesAgentAttchedImgUrls: {
        type: [String],

    },
    assignedDate: {
        type: Date
    },
    checkingRemarks: {
        type: String,

    }
});




export const Claim = model<IclaimType>("Claim", claimSchema);