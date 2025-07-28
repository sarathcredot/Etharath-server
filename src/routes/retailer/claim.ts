

import express from "express"
const router = express.Router()
import { retailerClaimController } from "../../controllers/retailer/claimController"



router.post("/", retailerClaimController.requestClaim);
router.get("/", retailerClaimController.getAllClaimRequests);
router.get("/:claimId", retailerClaimController.getClaimById);






export default router;