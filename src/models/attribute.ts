

import { Schema, model, Document, ObjectId } from 'mongoose';



const attributesSchema = new Schema({
    origin: [{ type: String }],
    yearOfManufacturer: [{ type: String }]
});




export const Attributes = model("Attributes", attributesSchema);
