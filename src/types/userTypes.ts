

import { Schema, model, Document, ObjectId } from 'mongoose';



export interface IUserType extends Document {
    userName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isVerified?: string;
    isSuspend?: boolean;
    password?: string;
    imgUrl?: string;
    salesAgentOwner?: ObjectId | null;
    location: string,
    eidNo: string,
    eidFile: string,
    vendorTag: string

}


export type UserReqType = {

    userName: string;
    email?: string;
    phoneNumber: string;
    role: string;
    password?: string;
    imgUrl?: string;
}


export type UserRole = {

    ADMIN: 'admin';
    VENDER: "vendor";
    RETAILER: "retailer";
    SALES_EXECUTIVE: "sales_executive";
}


export type LoginDataType = {

    emailOrPhoneNumber: string,
    password?: string
}

export type KycType = {

    PENDING: 'pending';
    APPROVED: 'approved';
    REJECTED: 'rejected';
}



export type KycDetails = {
    createdBy: ObjectId;
    kycDetails: {
        businessName: string;
        tradeLicenseNumber: string;
        licenseExpiryDate: Date;
        emiratesId: string;
        contactPerson: string;
        contactNumber: string;
        email: string;
        emirate:
        | 'Dubai'
        | 'Abu Dhabi'
        | 'Sharjah'
        | 'Ajman'
        | 'Fujairah'
        | 'Ras Al Khaimah'
        | 'Umm Al Quwain';
        vatNumber?: string;
        documents: {
            tradeLicense: string;
            emiratesIdCopy: string;
            vatCertificate?: string;
        };
        address: {
            streetAddress: string;
            area: string;
            city: string;
            poBox?: string;
        };
        kycStatus: 'pending' | 'approved' | 'rejected';
    };
};



export type VerifyType = {
    PENDING: 'pending';
    APPROVED: 'approved';
    REJECTED: 'rejected';

}


