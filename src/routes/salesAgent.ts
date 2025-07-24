

import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth"
import {checkIsSalesAgent} from "../middlewares/checkIsSalesagent"
import salesAgentOrderRouter from "./salesAgent/order";

router.use(auth);
router.use(checkIsSalesAgent());




router.use("/order", salesAgentOrderRouter);











export default router;