


import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth"
import { checkIsRetailer } from "../middlewares/checkIsRetailer";
import retailerProductRouter from "./retailer/product"
import retailerOrderRouter from "./retailer/order"
import retailerCliamRouter from "./retailer/claim"



// auth validation
router.use(auth)

// check if the user is a retailer

router.use(checkIsRetailer())




router.use("/product",retailerProductRouter)
router.use("/order",retailerOrderRouter)
router.use("/claim",retailerCliamRouter)













export default router;