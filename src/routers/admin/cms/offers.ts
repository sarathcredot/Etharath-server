
import express from "express"
const router = express.Router()
import { offersController } from "../../../controllers/admin/cms/offersController"



router.get("/", offersController.getAllOffers)
router.post("/", offersController.createNewOffers)
router.get("/:offerId", offersController.getOfferDetailsById)
router.patch("/:offerId", offersController.updateOfferDetailsById)
router.patch("/:offerId/update-status", offersController.updateOfferStatusById)
router.delete("/:offerId", offersController.updateOfferDetailsById)











export default router;