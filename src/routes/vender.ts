
import express from "express";
const router = express.Router();
import venderProductRouter from "./vender/product"
import vendorOrderRouter from "./vender/order"
import { auth } from "../middlewares/auth"
import {checkIsVendor} from "../middlewares/checkIsVender"






// auth validation
router.use(auth)

// is vendor check
router.use(checkIsVendor())



router.use("/product",venderProductRouter)
router.use("/order",vendorOrderRouter)











export default router;