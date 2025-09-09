

import express from "express"
const router = express.Router()
import { proCategoryController } from "../../controllers/admin/proCategoryController"




router.get("/", proCategoryController.getAllCategory)
router.post("/", proCategoryController.addCategory)
router.delete("/", proCategoryController.deleteCategory)












export default router