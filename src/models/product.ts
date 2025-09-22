
import { IProductType } from "../types/product"
import { Schema, ObjectId, model } from "mongoose"
import { VERIFY_STATUS } from "../utils/constants"





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
    imageUrl: [

        {
            type: String,
            required: true
        }
    ],
    origin: {

        type: String,
        required: true
    },
    yearOfManufacturer: {

        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true

    },
    height: {
        type: Number,
        required: true

    },
    size: {

        type: Number,
        required: true

    },
    description: {

        type: String
    },
    isVerified: {
        type: String,
        default: VERIFY_STATUS.PENDING
    },
    isSuspend: {
        type: Boolean,
        default: false
    },
    createdBY: {

        type: Schema.Types.ObjectId,
        required: true
    }



})


const ProductStocksSchema = new Schema({

    productId: {

        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    requestedBy: {

        type: Schema.Types.ObjectId,
        required: true

    },

    stock: {
        type: String,
        default: 0,

    },
    location: {

        type: String,

    },

    type: {
        type: String,
    },

    price: {

        type: Number,
        default: 0

    },
    warrantyPeriod: {

        type: Number,
        required: true


    },

    description: {

        type: String
    },

    isVerified: {
        type: String,
        default: VERIFY_STATUS.PENDING
    },
    isSuspend: {

        type: Boolean,
        default: false

    }
},

    {
        timestamps: true
    }

)



export const Product = model<IProductType>("Product", productSchema)

export const ProductStockVender = model("ProductStocksVender", ProductStocksSchema)