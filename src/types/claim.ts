

import { Schema, model, Document, ObjectId } from 'mongoose';
import { string } from 'zod';


export type IclaimType = {

    claimId: string,
    userId: ObjectId,
    orderId: ObjectId,
    vendorId: ObjectId,
    reason: string,
    status: string,
    claimProductQuantity: number,
    userAttchedImgUrls: string[],
    salesAgentAttchedImgUrls?: string[],
    requestedDate: Date,
    approvedDate: Date,
    rejectedDate: Date
    cancelledDate: Date,
    completedDate: Date,
    assignedToSalesAgent?: ObjectId,
    assignedDate?: Date,
    checkingRemarks: string,
    verifiedData:Date
}



export type ClaimReqType = {

    orderId: ObjectId,
    reason: string,
    claimProductQuantity: number,
    userAttchedImgUrls: string[],
}



export type UpdateClaimStstus = {

    status: string,
    salesAgentAttchedImgUrls?: string[],
    checkingRemarks: {
        type: String,

    }
}