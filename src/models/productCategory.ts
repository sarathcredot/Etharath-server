

import { Schema, ObjectId, model } from "mongoose"




const proCategorySchem = new Schema({

    values: [
        {
            type: String,
            required: true
        }
    ]
})


export const ProCategory = model("ProCategory", proCategorySchem);
