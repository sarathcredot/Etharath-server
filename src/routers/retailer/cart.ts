


import express from "express"
const router = express.Router()
import { cartController } from "../../controllers/retailer/cartController"



// add product stock in cart

router.post("/", cartController.addToCart)


// get user all cart items

router.get("/", cartController.getUserAllCartItems)


// increment cart item quantity

router.put("/:stockId/increment", cartController.incrementCartItemQuantity)

// decrement cart item quantity

router.put("/:stockId/decrement", cartController.decrementCartItemQuantity)

// delete item in cart 

router.delete("/:stockId", cartController.deleteCartItem)

export default router;