

import { Schema, model, Document, ObjectId } from 'mongoose';



const otpSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {

        type: Date,
        required: true,
    }
})


export const Otp = model('Otp', otpSchema);

