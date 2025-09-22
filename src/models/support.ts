

import { Schema, model, Document, ObjectId } from 'mongoose';




const supportRequestSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    working_email: {

        type: String,
        required: true

    },
    contact_number: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    
    description: {

        type: String,

    }

})



export const SupportRequest = model("SupportRequest", supportRequestSchema)