
import express from "express"
const router = express.Router()
import { adminKycController } from "../../controllers/admin/kycController"
import {kycDetailsSchema} from "../../schema.ts/kyc"
import { validation } from "../../utils/validation"






router.get("/:userId/kyc-details", adminKycController.getUserKycDetails)

router.post("/:userId/create-kyc",validation(kycDetailsSchema),  adminKycController.createUserKycDetails)


router.put("/:userId/update-kyc",validation(kycDetailsSchema), adminKycController.updateUserKycDetails)


router.put("/:userId/verify-kyc", adminKycController.kycVerification)


router.delete("/:userId/kyc-delete", adminKycController.deleteUserKycDetails)










export default router