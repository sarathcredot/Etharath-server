

import express from "express"
const router = express.Router()
import {vendorOrderController} from "../../controllers/vender/orderController"




router.get("/",vendorOrderController.getAllMyOrders)
router.get("/:orderId", vendorOrderController.getOrderById)
router.put("/:orderId/update-status", vendorOrderController.updateOrderStatus)










export default router