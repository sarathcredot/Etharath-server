

import express from "express"
const router = express.Router()
import { adminDashboardController } from "../../controllers/admin/dashboardController"


// get total , this month and last month vendor , retailer , order and sales agent count

router.get("/count-data", adminDashboardController.getTotalAndThisMonthCount)

// get graphical display  for vendor , retailer , sales agent and order data. time line based filter

router.get("/time-line-data", adminDashboardController.getTotalCountBasedTimeLine)

// get top vendors , retailers , sales agent and order data

router.get("/top-data", adminDashboardController.getTopDetails)


// get total revenue data . month, year, week, etc..

router.get("/revenue-data", adminDashboardController.getRevenueDetails)


// total revenue data graphical display api. use time line filter

router.get("/revenue-data-all-graphical", adminDashboardController.getRevenuedataGraphical)


// total subscription count for role based filter

router.get("/subscription-data", adminDashboardController.getSubScriptionCountDataByRole)

// get revenue data for graphical display role based filter

router.get("/revenue-data-role-graphical", adminDashboardController.getRevenuedataGraphicalByRole)

// get revenue data by this month , last month and total. role based filter

router.get("/revenue-data-role-month", adminDashboardController.getRevenuedatabymonthByRole)


export default router;