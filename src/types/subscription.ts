
import { Schema, ObjectId, model } from "mongoose"


export type RoleType = 'retailer' | 'vendor';
export type PlanName = 'standered' | 'executive' | 'corporate';
export type DurationType = 'monthly' | 'yearly';
export type ReportAccessType = 'none' | 'limited' | 'full';

export interface SubscriptionPlanType {
    role: RoleType;
    plan: PlanName;
    price: number;
    currency?: string; // default: 'AED'
    duration?: DurationType; // default: 'monthly'
    features?: string[];
    maxUsers?: number; // for user limits
    maxBrands?: number; // for vendor-specific plans
    maxVendors?: number; // for retailer-specific plans
    maxSearchesPerDay?: number; // for retailer "Standered" plan
    extraUserCharge?: number; // vendor corporate only
    extraBrandCharge?: number; // vendor corporate only
    specialBadging?: boolean;
    accessAllProducts?: boolean;
    accessAllCustomers?: boolean;
    accessMarketData?: boolean;
    accessReports?: ReportAccessType;
    accessClaimManagement?: boolean;
    isSuspend?: boolean;
}






export type UserRole = 'retailer' | 'vendor';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface PaymentDetails {
    method?: string;
    transactionId?: string;
    paidOn?: Date;
}

export interface UserSubscriptionType {

    subId: string
    // optional MongoDB ID
    userId: ObjectId; // reference to User _id
    // role: UserRole;
    planId: ObjectId; // reference to SubscriptionPlan _id
    startDate: Date;
    endDate: Date;
    isActive?: boolean; // default: true
    purchase_Data: Date
    additionalUsers?: number; // for vendor corporate
    additionalBrands?: number; // for vendor corporate
    paymentStatus?: PaymentStatus; // default: pending
    paymentDetails?: PaymentDetails;
    userSearchPerDay?: Number;
    userSearchCount?: Number;
    userSearchResetDate?: Date;
}




export interface ISubscriptionPlanType {

    role: UserRole,
    plan: PlanName,
    price: number,
    duration: DurationType,
    features: string[],
    isSuspend: Boolean



}