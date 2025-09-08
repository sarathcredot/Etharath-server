


import { Schema, model, Document, ObjectId } from 'mongoose';







export interface ICartType extends Document {

    userId: ObjectId,
    products: Array<{
        stockId: ObjectId,
        quantity: number
    }>,
    totalPrice: number,
}


export type AddtoCart={

    userId:ObjectId,
    stocksId:ObjectId[]
}