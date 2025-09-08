

import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth"
import { checkIsSalesAgent } from "../middlewares/checkIsSalesagent"
import salesAgentOrderRouter from "./salesAgent/order";
import productRouter from "./salesAgent/product"
import claimRouter from "./salesAgent/claim"
import { verifyAccountIsSuspended } from "../middlewares/checkAccountActive";

router.use(auth);
router.use(checkIsSalesAgent());

// check account is suspended
router.use(verifyAccountIsSuspended)


router.use("/order", salesAgentOrderRouter);
router.use("/product", productRouter)
router.use("/claim", claimRouter)





export default router;