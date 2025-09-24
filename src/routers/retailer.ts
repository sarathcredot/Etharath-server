


import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth"
import { checkIsRetailer } from "../middlewares/checkIsRetailer";
import retailerProductRouter from "./retailer/product"
import retailerOrderRouter from "./retailer/order"
import retailerCliamRouter from "./retailer/claim"
import retailerCartRouter from "./retailer/cart"
import retailerInstantCourtRouter from "./retailer/instantCourt"
import retailerSubscriptionRouter from "./vender/subscription"

import { verifyAccountIsSuspended } from "../middlewares/checkAccountActive";




// auth validation
router.use(auth)

// check if the user is a retailer

router.use(checkIsRetailer())

// check account is suspended
router.use(verifyAccountIsSuspended)




router.use("/product", retailerProductRouter)
router.use("/order", retailerOrderRouter)
router.use("/claim", retailerCliamRouter)
router.use("/cart", retailerCartRouter)
router.use("/instant-court", retailerInstantCourtRouter)
router.use("/subscription", retailerSubscriptionRouter)














export default router;