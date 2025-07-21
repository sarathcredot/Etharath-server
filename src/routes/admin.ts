
import express from "express"
const router=express.Router()
import authRouter from "./admin/auth"
import adminKycRout from "./admin/kyc"
import { auth } from "../middlewares/auth"
import {checkIsAdmin} from "../middlewares/checkIsAdmin"
import userControllRoute from "./admin/user"
import brandRouter from "./admin/brand"
import productRouter from "./admin/product"



// auth validation
router.use(auth)

// is admin check
router.use(checkIsAdmin())





router.use("/auth",authRouter)
router.use("/kyc",adminKycRout)
router.use("/user-controll",userControllRoute)
router.use("/brand",brandRouter)
router.use("/product",productRouter)















export default router



