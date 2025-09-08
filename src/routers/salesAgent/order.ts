

import express from "express"
const router = express.Router()
import { salesAgentOrderController } from "../../controllers/salesAgent/orderController"




router.get("/",salesAgentOrderController.getAllMyAssignedOrders)
router.get("/:orderId", salesAgentOrderController.getOrderById)
router.put("/:orderId/update-status", salesAgentOrderController.updateOrderStatus)












export default router