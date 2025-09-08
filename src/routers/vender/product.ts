

import express from "express"
const router = express.Router()
import { vendorProductController } from "../../controllers/vender/productController"
import { verifyAccountKyc } from "../../middlewares/checkAccountActive"





router.get("/", vendorProductController.getAllProducts)

router.get("/myproducts", vendorProductController.getAllMyProduct)

router.get("/myproducts/:reqId", vendorProductController.getMyProductStockById)

router.post("/:reqId", vendorProductController.isSuspendProductStock)

router.post("/:reqId/update-stock", verifyAccountKyc, vendorProductController.stockEditById)

router.delete("/:reqId", vendorProductController.deleteProductStock)

router.get("/:proId", vendorProductController.getProductsByID)

router.post("/:proId/product-stock-add-req", verifyAccountKyc,   vendorProductController.productAccessRequestByVender)














export default router
