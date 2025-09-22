

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
    category: {

        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    status: {

        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)




const blogTagSchema = new Schema({

    tags: [
        {
            type: String
        }
    ]
})


const blogcategorySchema = new Schema({

    categories: [
        {
            type: String
        }
    ]
})



export const BlogTag = model<IBlogType>("BlogTag", blogTagSchema);

export const BlogCategory = model("BlogCategory", blogcategorySchema);

export const Blog = model<IBlogType>("Blog", blogSchema);

