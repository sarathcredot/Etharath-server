


import express from "express"
const router = express.Router()
import { adminSubscriptionController } from "../../controllers/admin/subscriptionController"


router.get("/", adminSubscriptionController.getAllSubscriptionPurchaseTransactions)

router.get("/:planId", adminSubscriptionController.getPlanUnderAllActiveOrders)

router.get("/:planId/order/:orderId", adminSubscriptionController.getSubScriptionOrderDetailsById)

router.patch("/:planId/order/:orderId", adminSubscriptionController.updateSubscriptionOrderExpiryDate)




export default router;