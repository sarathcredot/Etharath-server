

import express from "express"
const router = express.Router()
import { brandControllerByAdmin } from "../../controllers/admin/brandController"
import { brandSchema, brandisActiveSchema } from "../../schema.ts/admin/brandSchema"
import { validation } from "../../utils/validation"



router.get("/", brandControllerByAdmin.getAllBrand)
router.get("/:id", brandControllerByAdmin.getBrandById)
router.post("/", validation(brandSchema), brandControllerByAdmin.createBrand)
router.put("/:id", validation(brandSchema), brandControllerByAdmin.updateBrandDetails)
router.put("/:id/active-controll", validation(brandisActiveSchema), brandControllerByAdmin.activeControllBrandDetails)
router.delete("/:id", brandControllerByAdmin.deleteBrand)
router.get("/:id/all-products", brandControllerByAdmin.getAllProductsByBarandId)












export default router