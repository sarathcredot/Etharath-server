

import express from "express"
const router = express.Router()
import { adminSalesAgentController } from "../../controllers/admin/salesAgentController";




router.get("/",adminSalesAgentController.getAllSalesAgents)
router.post("/",adminSalesAgentController.createSalesAgent)

router.put("/agentId/update-status",adminSalesAgentController.isSuspendSalesAgent)






export default router;