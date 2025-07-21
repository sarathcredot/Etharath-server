

import express from 'express';
const router = express.Router();
import {auth} from "../middlewares/auth"
import {UpdateUserSchema} from "../schema.ts/auth"
import {validation} from "../utils/validation"
import {userController} from "../controllers/userController"


router.use(auth)


router.get("/",userController.getProfile)
router.put("/",validation(UpdateUserSchema),userController.updateProfile)















export default router