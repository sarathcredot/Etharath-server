

import { Schema, model, Document, ObjectId } from 'mongoose';


export interface IBrand extends Document {
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Brand= model<IBrand>('Brand', BrandSchema);



