

import { Schema, ObjectId, model } from "mongoose"
import { IorderType } from "../types/order"



const orderSchema = new Schema<IorderType>({

    orderId: {

        type: String,
        required: true


    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stockIdByVendor: {
        type: Schema.Types.ObjectId,
        ref: "ProductStocksVendor",
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "in-progress", "delivered", "cancelled"]

    },
    paymentStatus: {
        type: String,
        default: "unpaid",
        enum: ["unpaid", "paid", "refunded"]
    },
    paymentMethod: {
        type: String,

    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    assignedToSalesAgent: {
        type: Schema.Types.ObjectId,
        ref: "User"

    },
    assignedDate: {
        type: Date
    },
    deliveryDate: {
        type: Date
    },
    cancelledDate: {
        type: Date
    }



},
    { timestamps: true }
)


export const Order = model("Order", orderSchema)











