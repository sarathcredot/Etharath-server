

import express from "express"
const router = express.Router()
import { adminOrderController } from "../../controllers/admin/orderController"



router.get("/", adminOrderController.getAllOrders);
router.get("/:orderId", adminOrderController.getOrderById);
router.put("/:orderId/update-status", adminOrderController.updateOrderStatus);








export default router