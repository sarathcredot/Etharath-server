

import express from "express"
const router = express.Router()
import { salesAgentClaimController } from "../../controllers/salesAgent/claimController"



router.get("/", salesAgentClaimController.getAllAssignedMyClaims)
router.get("/:claimId", salesAgentClaimController.getClaimDetailsByID)
router.put("/:claimId/update-status", salesAgentClaimController.updateCliamStatus)






export default router