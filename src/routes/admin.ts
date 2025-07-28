
import express from "express"
const router=express.Router()
import authRouter from "./admin/auth"
import adminKycRout from "./admin/kyc"
import { auth } from "../middlewares/auth"
import {checkIsAdmin} from "../middlewares/checkIsAdmin"
import userControllRoute from "./admin/user"
import brandRouter from "./admin/brand"
import productRouter from "./admin/product"
import salesAgentRouter from "./admin/salesAgent"
import orderRouter from "./admin/order"
import claimRouter from "./admin/claim"



// auth validation
router.use(auth)

// is admin check
router.use(checkIsAdmin())





router.use("/auth",authRouter)
router.use("/kyc",adminKycRout)
router.use("/users",userControllRoute)
router.use("/brand",brandRouter)
router.use("/product",productRouter)
router.use("/sales-agent",salesAgentRouter)
router.use("/order",orderRouter)
router.use("/claim",claimRouter)















export default router



