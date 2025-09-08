

import express from "express"
const router = express.Router()
import { instantCourtController } from "../../controllers/retailer/instantCountController"




router.get("/", instantCourtController.getCourt)
router.post("/", instantCourtController.addCourt)










export default router