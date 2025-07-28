

import express from "express"
const router = express.Router()
import { adminCliamController } from "../../controllers/admin/claimController"



router.get("/", adminCliamController.getAllClaimRequests);
router.get("/:claimId", adminCliamController.getClaimById);
router.put("/:claimId/update-status", adminCliamController.updateClaimStatus);


export default router;