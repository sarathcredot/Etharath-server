


import express from "express"
const router = express.Router()
import { vendorClaimController } from "../../controllers/vender/cliamController"



router.get("/", vendorClaimController.getAllClaimRequests);
router.get("/:claimId", vendorClaimController.getClaimById);
router.put("/:claimId/update-status", vendorClaimController.updateClaimStatus);


export default router;

