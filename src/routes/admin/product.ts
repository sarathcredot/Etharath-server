

import express from "express"
const router = express.Router()
import {adminProductController} from "../../controllers/admin/productController"
import { validation } from "../../utils/validation"
import {productSchema} from "../../schema.ts/admin/productSchema"




router.get("/", adminProductController.getAllProducts)

router.get("/:proId", adminProductController.getProductsByID)

router.post("/",validation(productSchema), adminProductController.addProduct)

router.put("/:proId",validation(productSchema), adminProductController.updateProduct)

router.delete("/:proId", adminProductController.deleteProduct)

router.put("/:proId/verify-product", adminProductController.verifyProduct)

router.put("/:proId/issuspend-product", adminProductController.isSuspendProduct)

router.get("/:proId/product-stocks", adminProductController.getAllStocksByProdectId)

router.put("/:proId/product-stock/:reqId/verify", adminProductController.verifyProductStockById)

router.put("/:proId/product-stock/:reqId/issuspend", adminProductController.isSuspendProductStock)















export default router