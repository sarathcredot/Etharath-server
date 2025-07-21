
import { UserRole } from "../types/userTypes"
import { KycType , VerifyType} from "../types/userTypes"




const ROLES: UserRole = {

    ADMIN: "admin",
    VENDER: "vender",
    RETAILER: "retailer",
    SALES_EXECUTIVE: "sales_executive"
}

export const USER_ROLES = ROLES


export const KYC_STATUS:KycType = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} ;


export const VERIFY_STATUS:VerifyType = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} ;


