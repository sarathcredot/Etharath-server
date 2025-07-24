

import { Schema, ObjectId, model } from "mongoose"
import { IorderType } from "../types/order"



const orderSchema = new Schema<IorderType>({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    stockByVendor: {
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
        required: true
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
    assignedToSalesAgent: {
        type: Schema.Types.ObjectId,
        ref: "User"

    }


},
    { timestamps: true }
)


export const Order = model("Order", orderSchema)











