import { Schema, model, Document, ObjectId } from 'mongoose';




export type BrandType = {

    name: string,
    imageUrl: string,
}


export interface IProductType extends Document {

    productName: string,
    brand: ObjectId,
    category: string,
    imageUrl: string[],
    isVerified: string,
    isSuspend: Boolean,
    createdBY: ObjectId,
    origin: string,
    yearOfManufacturer: number,
    width: number,
    height: number,
    size: number,
    description: string


}




export type ProductType = {

    productName: string,
    brand: ObjectId,
    category: string,
    imageUrl: string[],
    origin: string,
    yearOfManufacturer: string,
    width: number,
    height: number,
    size: number


}


export type GetallArrgu = {

    search: any,
    status?: any,
    isSuspend?: any,
    page: number,
    limit: number,
    role?: string,
    filter?: string
}

export type AccessRequesType = {

    productId: ObjectId,
    requestedBy: ObjectId,
    stock: number,
    location: string,
    price: number
    warrantyPeriod: number,
    type: string

}


export type ProductStockVenderType = {


    stock: number,
    location: string,
    price: number,

}


