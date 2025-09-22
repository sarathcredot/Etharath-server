

import express from "express"
const router = express.Router()
import { subcriptionController } from "../../controllers/vender/subscriptionController"




router.get("/", subcriptionController.getAllSubscriptionOrders)
router.post("/purchase", subcriptionController.purchaseSubscriptionPlan)
router.get("/:orderId", subcriptionController.getSubscriptionOrderDetailsById)






export default router