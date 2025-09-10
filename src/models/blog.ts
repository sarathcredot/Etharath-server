

import { Schema, model, Document, ObjectId } from 'mongoose';
import { IBlogType } from "../types/blog"



const blogSchema = new Schema<IBlogType>({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true

    },
    imgUrl: {

        type: String,
        required: true
    },
    tags: [
        {

            type: String,
            required: true
        }
    ],
    date: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    }
)


export const Blog = model<IBlogType>("Blog", blogSchema);
