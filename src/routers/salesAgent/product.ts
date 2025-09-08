


import express from "express"
const router = express.Router()
import { salesAgentProductController } from "../../controllers/salesAgent/productController"




router.get("/", salesAgentProductController.getAllProducts)
router.get("/:proId", salesAgentProductController.getProductsByID)
router.get("/:proId/product-stocks", salesAgentProductController.productStockDetailsById)








export default router



