


import { Schema, model, Document, ObjectId } from 'mongoose';



export interface IBlogType extends Document {


    title: string,
    content: string,
    date: Date,
    imgUrl: string,
    tags: string[],
    status: boolean,
    category: string

}