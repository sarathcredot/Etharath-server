

import express from "express"
const router = express.Router()
import { vendorProductController } from "../../controllers/vender/productController"
import { verifyAccountKyc } from "../../middlewares/checkAccountActive"





router.get("/", vendorProductController.getAllProducts)

router.get("/myproducts", vendorProductController.getAllMyProduct)

router.post("/:proId/product-stock-add-req", verifyAccountKyc, vendorProductController.productAccessRequestByVender)


router.get("/myproducts/:reqId", vendorProductController.getMyProductStockById)

router.post("/:reqId", verifyAccountKyc, vendorProductController.isSuspendProductStock)

router.post("/:reqId/update-stock", verifyAccountKyc, vendorProductController.stockEditById)

router.delete("/:reqId", verifyAccountKyc, vendorProductController.deleteProductStock)

router.get("/:proId", vendorProductController.getProductsByID)















export default router
