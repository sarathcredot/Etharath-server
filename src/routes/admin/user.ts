


import express from "express"
const router = express.Router()
import { adminUserController } from "../../controllers/admin/userController"
import { adminUpdateUserSchema } from "../../schema.ts/admin/userSchema"
import {UserRegisterSchema , getAllUsersSchema } from "../../schema.ts/auth"

import { validation , validationForGet} from "../../utils/validation"





router.get("/",validationForGet(getAllUsersSchema), adminUserController.getAllUsers)

router.get("/:id", adminUserController.getUserById)
router.put("/:id", validation(adminUpdateUserSchema), adminUserController.updateUserById)
router.put("/issuspend/:id", adminUserController.isSuspendUserById)
router.post("/",validation(UserRegisterSchema), adminUserController.createAuser)





export default router;