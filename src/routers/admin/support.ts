


import express from "express"
const router = express.Router()
import { customerSupportController } from "../../controllers/admin/supportController"




router.get("/", customerSupportController.getAllSupportRequest)
router.get("/:reqId", customerSupportController.getSupportRequestDetailsById)




export default router