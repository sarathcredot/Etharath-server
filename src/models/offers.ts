

import { Schema, model, Document, ObjectId } from 'mongoose';


export interface IOffers {

    imageUrl: string,
    priority: number,
    status: boolean


}


const offersSchema = new Schema<IOffers>({

    imageUrl: {

        type: String,
        requireed: true
    },
    priority: {

        type: Number,
        requireed: true
    },
    status: {

        type: Boolean,
        default: true
    }
})



export const Offers = model<IOffers>("Offers", offersSchema);
