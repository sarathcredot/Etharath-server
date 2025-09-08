

import { ICartType } from "../types/cart"
import { Schema, ObjectId, model } from "mongoose"




const cartSchema = new Schema<ICartType>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    products: [{
        stockId: {
            type: Schema.Types.ObjectId,
            required: true
        },

        quantity: {
            type: Number,
            default: 1
        }
    }],

});

export const CartModel = model<ICartType>("Cart", cartSchema);

