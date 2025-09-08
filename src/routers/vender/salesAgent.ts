


import express from "express"
const router = express.Router()
import { vendorSalesAgentController } from "../../controllers/vender/salesAgentController"



router.get("/", vendorSalesAgentController.getSalesAgents);
router.post("/", vendorSalesAgentController.createSalesAgent);
router.get("/:agentId", vendorSalesAgentController.getSalesAgentById);
router.patch("/:agentId/suspend", vendorSalesAgentController.isSuspendSalesAgent);








export default router