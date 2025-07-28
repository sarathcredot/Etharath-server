
import express from "express";
const router = express.Router();
import venderProductRouter from "./vender/product"
import vendorOrderRouter from "./vender/order"
import vendorSalesAgentRouter from "./vender/salesAgent"
import vendorCliamRouter from "./vender/claim"
import { auth } from "../middlewares/auth"
import {checkIsVendor} from "../middlewares/checkIsVender"






// auth validation
router.use(auth)

// is vendor check
router.use(checkIsVendor())



router.use("/product",venderProductRouter)
router.use("/order",vendorOrderRouter)
router.use("/sales-agent", vendorSalesAgentRouter)
router.use("/claim", vendorCliamRouter)











export default router;