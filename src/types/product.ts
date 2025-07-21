import { Schema, model, Document, ObjectId } from 'mongoose';




export type BrandType = {

    name: string,
    imageUrl: string,
}


export interface IProductType extends Document {

    productName: string,
    brand: ObjectId,
    category: string,
    imageUrl: string,
    isVerified: string,
    isSuspend: Boolean,
    createdBY: ObjectId


}




export type ProductType = {

    productName: string,
    brand: ObjectId,
    category: string,
    imageUrl: string,
    
}


export  type GetallArrgu={

    search:any,
    status?:any,
    isSuspend?:any,
    page:number,
    limit:number
}