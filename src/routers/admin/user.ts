


import express from "express"
const router = express.Router()
import { adminUserController } from "../../controllers/admin/userController"
import { adminUpdateUserSchema } from "../../schema.ts/admin/userSchema"
import { UserRegisterSchema, getAllUsersSchema } from "../../schema.ts/auth"
import { validation, validationForGet } from "../../utils/validation"





router.get("/", validationForGet(getAllUsersSchema), adminUserController.getAllUsers)

router.get("/:id", adminUserController.getUserById)
router.put("/:id", validation(adminUpdateUserSchema), adminUserController.updateUserById)
router.put("/issuspend/:id", adminUserController.isSuspendUserById)
router.post("/", validation(UserRegisterSchema), adminUserController.createAuser)

router.get("/vendor/:id/all-stocks", adminUserController.getVendorAllStocks)
router.get("/vendor/:id/all-orders", adminUserController.getVendorAllOrders)

router.get("/retailer/:id/all-orders", adminUserController.getRetailerAllOrders)

router.get("/sales-agent/:id/all-orders", adminUserController.getSalesAgentAssignedAllOrders)
router.get("/sales-agent/:id/all-claims", adminUserController.getSalesAgentAssignedAllClaims)






export default router;