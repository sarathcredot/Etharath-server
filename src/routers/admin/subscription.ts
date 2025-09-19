

import express from "express"
const router = express.Router()
import { adminSubscriptionController } from "../../controllers/admin/subscriptionController"



router.post("/", adminSubscriptionController.createPlan)

router.get("/", adminSubscriptionController.getAllPlans)

router.get("/:planId", adminSubscriptionController.getPlanDetailsById)

router.patch("/:planId", adminSubscriptionController.updatePlanDetailsById)

router.patch("/:planId/status-update", adminSubscriptionController.updatePlanStatusById)

router.delete("/:planId", adminSubscriptionController.deletePlanById)




export default router;

