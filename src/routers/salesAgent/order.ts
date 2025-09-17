

import express from "express"
const router = express.Router()
import { salesAgentOrderController } from "../../controllers/salesAgent/orderController"



router.get("/", salesAgentOrderController.getAllOrdersByLocation)
router.get("/assigned", salesAgentOrderController.getAllMyAssignedOrders)
router.get("/:orderId", salesAgentOrderController.getOrderById)
router.patch("/:orderId/update-status", salesAgentOrderController.updateOrderStatus)
router.patch("/:orderId/self-assign", salesAgentOrderController.orderSelfAssigned)













export default router