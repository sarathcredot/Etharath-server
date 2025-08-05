

import express from "express"
const router = express.Router()
import { retailerOrderController } from "../../controllers/retailer/order"



router.post("/", retailerOrderController.placeOrder)
router.get("/", retailerOrderController.getAllMyOrders)
router.get("/:orderId", retailerOrderController.getOrderById)
router.put("/:orderId/cancel", retailerOrderController.cancelMyOrderById)


















export default router;
