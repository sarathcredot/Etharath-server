

import express from "express"
const router = express.Router()
import { retailerOrderController } from "../../controllers/retailer/order"
import { verifyAccountKyc } from "../../middlewares/checkAccountActive"
import { validation } from "../../utils/validation"
import { orderPlace } from "../../schema.ts/order"




router.post("/", verifyAccountKyc, validation(orderPlace), retailerOrderController.placeOrder)
router.get("/", retailerOrderController.getAllMyOrders)
router.get("/:orderId", retailerOrderController.getOrderById)
router.put("/:orderId/cancel", retailerOrderController.cancelMyOrderById)


















export default router;
