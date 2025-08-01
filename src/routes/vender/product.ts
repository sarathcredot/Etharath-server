

import express from "express"
const router = express.Router()
import { vendorProductController } from "../../controllers/vender/productController"





router.get("/", vendorProductController.getAllProducts)

router.get("/myproducts",vendorProductController.getAllMyProduct)

router.get("/myproducts/:reqId",vendorProductController.getMyProductStockById)

router.post("/:reqId", vendorProductController.isSuspendProductStock)

router.post("/:reqId/update-stock", vendorProductController.stockEditById)

router.delete("/:reqId", vendorProductController.deleteProductStock)

router.get("/:proId", vendorProductController.getProductsByID)

router.post("/:proId/product-access-req", vendorProductController.productAccessRequestByVender)














export default router
