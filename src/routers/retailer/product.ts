


import express from "express"
const router = express.Router()
import {retailerProductController} from "../../controllers/retailer/product"




router.get("/",retailerProductController.getAllProducts)
router.get("/:proId", retailerProductController.getProductsByID)
router.get("/:proId/product-stocks", retailerProductController.productStockDetailsById)








export default router