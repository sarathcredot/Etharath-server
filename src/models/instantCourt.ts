
import { Schema, model, Document, ObjectId } from 'mongoose';
import { IInstantCountType } from "../types/instantCourt"




const instantCourtSchema = new Schema<IInstantCountType>({


    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userName: {

        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"

            },
            quantity: {
                type: Number,
                required: true

            },
            total: {
                type: Number,
                required: true
            }

        }
    ],
    totalAmmount: {

        type: Number,
        required: true
    }



},
    {
        timestamps: true
    }
)



export const InstantCounrt = model<IInstantCountType>("InstantCounrt", instantCourtSchema);



