
import { IProductType } from "../types/product"
import { Schema, ObjectId, model } from "mongoose"
import {VERIFY_STATUS} from "../utils/constants"





const productSchema = new Schema<IProductType>({

    productName: {
        type: String,
        required: true
    },
    brand: {

        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category: {

        type: String,
        required: true
    },
    imageUrl: {

        type: String,
        required: true
    },
    isVerified: {
        type: String,
        default: VERIFY_STATUS.PENDING
    },
    isSuspend: {
        type: Boolean,
        default: false
    },
    createdBY:{

        type:Schema.Types.ObjectId,
        required:true
        
    }







})




export const Product = model<IProductType>("Product", productSchema)