
import express from 'express';
const router = express.Router();
import { kycController } from '../controllers/kycController';
import {auth} from "../middlewares/auth"
import {validation} from "../utils/validation"
import {kycDetailsSchema} from "../schema.ts/kyc"


// // auth validation

router.use(auth)


router.get("/",kycController.getKyc)

router.post("/create-Kyc",validation(kycDetailsSchema), kycController.createKyc)

router.put("/update-kyc",validation(kycDetailsSchema),kycController.updateKyc)

router.delete("/kyc-delete",kycController.deleteKyc)











export default router;