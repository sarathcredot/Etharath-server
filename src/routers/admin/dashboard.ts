

import express from "express"
const router = express.Router()
import { adminDashboardController } from "../../controllers/admin/dashboardController"




router.get("/count-data", adminDashboardController.getTotalAndThisMonthCount)

router.get("/time-line-data", adminDashboardController.getTotalCountBasedTimeLine)

router.get("/top-data", adminDashboardController.getTopDetails)





export default router;