

import express from "express"
const router = express.Router()
import { attributesController } from "../../controllers/admin/attributes"




router.get("/", attributesController.getAttributes)
router.post("/", attributesController.addAttributes)
router.delete("/", attributesController.deleteAttribute)







export default router;0