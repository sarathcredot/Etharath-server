

import express from "express"
const router=express.Router()
import {adminAuthController} from "../../controllers/admin/authController"
import { validation } from "../../utils/validation"
import { adminAuthSchema } from "../../schema.ts/admin/authSchema"


router.post("/register",
    validation(adminAuthSchema),
    adminAuthController.register
)










export default router

