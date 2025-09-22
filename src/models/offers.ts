

import { Schema, model, Document, ObjectId } from 'mongoose';


export interface IOffers {

    imageUrl: string,
    priority: number,
    status: boolean,
    link?:string


}


const offersSchema = new Schema<IOffers>({

    imageUrl: {

        type: String,
        required: true
    },
    priority: {

        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    link: {
        type: String,
    }
})



export const Offers = model<IOffers>("Offers", offersSchema);
