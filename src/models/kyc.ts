

import { Schema, model, Document, ObjectId } from 'mongoose';
import {KYC_STATUS} from "../utils/constants"



const kycSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    businessName: { type: String, required: true, trim: true },
    tradeLicenseNumber: { type: String, required: true, unique: true },
    licenseExpiryDate: { type: Date, required: true },
    emiratesId: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    emirate: {
        type: String,
        enum: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'],
        required: true
    },
    vatNumber: { type: String },
    documents: {
        tradeLicense: { type: String, required: true },
        emiratesIdCopy: { type: String, required: true },
        vatCertificate: { type: String },
    },
    address: {
        streetAddress: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        poBox: { type: String }
    },
    kycStatus:{
        type:String,
        enum:['pending', 'approved', 'rejected'],
        default:KYC_STATUS.PENDING
    }

}, { timestamps: true }
)


export const Kyc = model('Kyc', kycSchema);
