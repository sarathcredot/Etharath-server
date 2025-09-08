


import { Schema, model, Document, ObjectId } from 'mongoose';



export interface IInstantCountType extends Document {


    createdBy: ObjectId,
    userName: string,
    phoneNumber: string,
    email: string,
    place: string,
    products: [],
    totalAmmount: number

}

