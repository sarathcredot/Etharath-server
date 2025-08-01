
import { UserRole } from "../types/userTypes"
import { KycType, VerifyType } from "../types/userTypes"


type OrderStatusType = {

  PENDING: 'pending';
  IN_PROGRESS: 'in-progress';
  DELIVERED: 'delivered';
  CANCELLED: 'cancelled';
}

// type ClaimStatusType = {
//   PENDING: 'pending';
//   APPROVED: 'approved';
//   REJECTED: 'rejected';
//   CANCELLED: 'cancelled';
//   COMPLETED: 'completed';

// }



const ROLES: UserRole = {

  ADMIN: "admin",
  VENDER: "vendor",
  RETAILER: "retailer",
  SALES_EXECUTIVE: "sales_executive"
}

export const USER_ROLES = ROLES


export const KYC_STATUS: KycType = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};


export const VERIFY_STATUS: VerifyType = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};


export const OrderStatus: OrderStatusType = {

  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',


}







export enum ClaimStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  VERIFIED = 'verified',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}


