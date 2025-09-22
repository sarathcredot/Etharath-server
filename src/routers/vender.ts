
import express from "express";
const router = express.Router();
import venderProductRouter from "./vender/product"
import vendorOrderRouter from "./vender/order"
import vendorSalesAgentRouter from "./vender/salesAgent"
import vendorCliamRouter from "./vender/claim"
import vendorSubscriptionRouter from "./vender/subscription"
import { auth } from "../middlewares/auth"
import { checkIsVendor } from "../middlewares/checkIsVender"
import { verifyAccountIsSuspended } from "../middlewares/checkAccountActive"






// auth validation
router.use(auth)

// is vendor check
router.use(checkIsVendor())

// check account is suspended
router.use(verifyAccountIsSuspended)



router.use("/product", venderProductRouter)
router.use("/order", vendorOrderRouter)
router.use("/sales-agent", vendorSalesAgentRouter)
router.use("/claim", vendorCliamRouter)
router.use("/subscription", vendorSubscriptionRouter)











export default router;