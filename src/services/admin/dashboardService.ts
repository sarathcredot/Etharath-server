
import { User } from "../../models/user"
import { Order } from "../../models/order"
import { USER_ROLES } from "../../utils/constants"
import { Product, ProductStockVender } from "../../models/product"
import { SubOrder } from "../../models/subscriptionOrdes"







export const adminDashboardServices = {


    // total and this month count of vendor , retailer , sales executives and order

    getTotalAndThisMonthCount: () => {

        return new Promise(async (resolve, reject) => {

            try {


                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                // this month
                const endOfMonth = new Date(startOfMonth);
                endOfMonth.setMonth(endOfMonth.getMonth() + 1);

                // last month 
                const startOfLastMonth = new Date(startOfMonth);
                startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
                const endOfLastMonth = new Date(startOfMonth);


                const [
                    totalVendors,
                    thisMonthVendor,
                    lastMonthVenor,

                    totalRetailers,
                    thisMonthRetailers,
                    lastMonthRetailer,

                    totalSalesExecutives,
                    thisMonthSalesExecutives,
                    lastMonthSalesExecutives,

                    totalOrders,
                    thisMonthOrder,
                    lastMOnthOrder

                ] = await Promise.all([


                    // find total vendord count

                    User.countDocuments({ role: USER_ROLES.VENDER }),

                    // this month account created vendors conunt

                    User.countDocuments({
                        role: USER_ROLES.VENDER,
                        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
                    }),

                    // find last month vendord count

                    User.countDocuments({
                        role: USER_ROLES.VENDER,
                        createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
                    }),

                    // find total retailers count

                    User.countDocuments({ role: USER_ROLES.RETAILER }),

                    // this month account created retailers conunt

                    User.countDocuments({
                        role: USER_ROLES.RETAILER,
                        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
                    }),

                    // find last month vendord count

                    User.countDocuments({
                        role: USER_ROLES.RETAILER,
                        createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
                    }),


                    // find total sales executives count

                    User.countDocuments({ role: USER_ROLES.SALES_EXECUTIVE }),

                    // this month account created sales executives conunt

                    User.countDocuments({
                        role: USER_ROLES.SALES_EXECUTIVE,
                        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
                    }),

                    // find last month sales executives count

                    User.countDocuments({
                        role: USER_ROLES.SALES_EXECUTIVE,
                        createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
                    }),


                    // find total order count

                    Order.countDocuments(),

                    // this month order conunt

                    Order.countDocuments({

                        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
                    }),

                    // find last month order count

                    Order.countDocuments({

                        createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
                    }),


                ])


                resolve({

                    vendor: {

                        total: totalVendors ?? 0,
                        thisMonth: thisMonthVendor ?? 0,
                        lastMonth: lastMonthVenor ?? 0
                    },

                    retailer: {

                        total: totalRetailers ?? 0,
                        thisMonth: thisMonthRetailers ?? 0,
                        lastMonth: lastMonthRetailer ?? 0
                    },

                    salesExecutives: {

                        total: totalSalesExecutives ?? 0,
                        thisMonth: thisMonthSalesExecutives ?? 0,
                        lastMonth: lastMonthSalesExecutives ?? 0

                    },

                    order: {

                        total: totalOrders ?? 0,
                        thisMonth: thisMonthOrder ?? 0,
                        lastMonth: lastMonthVenor ?? 0
                    }
                })


            } catch (error: any) {

                reject(error.message)
            }

        })
    },

    // get count data for graphical display

    getTotalCountBasedTimeLine: ({ filter, role, order }: { filter: string, role: string, order: boolean }) => {

        return new Promise(async (resolve, reject) => {


            try {


                const now = new Date();
                let groupId: any;
                let startDate: Date;

                switch (filter) {
                    case 'day':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        groupId = { hour: { $hour: "$createdAt" } };
                        break;

                    case 'week':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);
                        groupId = { week: { $week: "$createdAt" } };
                        break;

                    case 'month':
                        startDate = new Date(now.getFullYear(), 0, 1); // Jan 1st
                        groupId = { month: { $month: "$createdAt" } };
                        break;

                    case 'year':
                        startDate = new Date(now.getFullYear() - 4, 0, 1); // Last 5 years
                        groupId = { year: { $year: "$createdAt" } };
                        break;

                    default:
                        startDate = new Date(now.getFullYear(), 0, 1);
                        groupId = { month: { $month: "$createdAt" } };
                }


                let result = []

                if (order) {

                    // find order time line data

                    result = await Order.aggregate([
                        {
                            $match: {

                                createdAt: { $gte: startDate }

                            }
                        },
                        {
                            $group: {
                                _id: groupId,
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id": 1 } }
                    ]);


                } else {

                    result = await User.aggregate([
                        {
                            $match: {
                                role: role,          // Only vendors
                                createdAt: { $gte: startDate }
                            }
                        },
                        {
                            $group: {
                                _id: groupId,
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id": 1 } }
                    ]);

                }

                if (result.length === 0) {

                    resolve(result)
                    return;
                }


                let formattedResult: number[] = [];

                switch (filter) {
                    case 'day':
                        formattedResult = Array(24).fill(0);
                        result.forEach(item => { formattedResult[item._id.hour] = item.count; });
                        break;
                    case 'week':
                        formattedResult = Array(4).fill(0);
                        const currentWeek = Math.ceil(((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)));
                        result.forEach(item => {
                            const idx = (item._id.week - currentWeek + 4) % 4;
                            formattedResult[idx] = item.count;
                        });
                        break;
                    case 'month':
                        formattedResult = Array(12).fill(0);
                        result.forEach(item => { formattedResult[item._id.month - 1] = item.count; });
                        break;
                    case 'year':
                        formattedResult = Array(5).fill(0);
                        result.forEach(item => { formattedResult[item._id.year - startDate.getFullYear()] = item.count; });
                        break;
                }

                resolve(formattedResult);


            } catch (error: any) {

                reject(error.message)
            }

        })

    },


    // find top vendors. based on order and product stock count

    getTopDetails: ({ filter }: { filter: string }) => {

        return new Promise(async (resolve, reject) => {

            try {

                // find top vendors

                if (filter === USER_ROLES.RETAILER) {

                    // Step 1: Aggregate order count per vendor
                    const orderCounts = await Order.aggregate([
                        {
                            $group: {
                                _id: "$vendorId",
                                orderCount: { $sum: 1 }
                            }
                        }
                    ]);

                    // Step 2: Aggregate product stock count per vendor
                    const stockCounts = await ProductStockVender.aggregate([
                        {
                            $group: {
                                _id: "$requestedBy", // vendor id
                                stockCount: { $sum: 1 }
                            }
                        }
                    ]);


                    // Step 3: Merge both counts
                    const combinedCountsMap: Record<string, any> = {};

                    orderCounts.forEach(item => {
                        combinedCountsMap[item._id.toString()] = {
                            vendorId: item._id,
                            orderCount: item.orderCount,
                            stockCount: 0
                        };
                    });


                    stockCounts.forEach(item => {
                        const id = item._id.toString();
                        if (combinedCountsMap[id]) {
                            combinedCountsMap[id].stockCount = item.stockCount;
                        } else {
                            combinedCountsMap[id] = {
                                vendorId: item._id,
                                orderCount: 0,
                                stockCount: item.stockCount
                            };
                        }
                    });


                    // Step 4: Convert map to array and sort by total (orderCount + stockCount) descending
                    const combinedCounts = Object.values(combinedCountsMap).sort((a, b) => {
                        const totalA = a.orderCount + a.stockCount;
                        const totalB = b.orderCount + b.stockCount;
                        return totalB - totalA; // largest first
                    });


                    // Step 5 (optional): Lookup vendor name from User collection

                    for (const vendor of combinedCounts) {
                        const vendorData: any = await User.findById(vendor.vendorId).select('name');
                        vendor.vendorName = vendorData?.name || "Unknown";
                    }


                    resolve(combinedCounts)




                }
                // find top retailer

                else if (filter === USER_ROLES.RETAILER) {


                    const result = await Order.aggregate([

                        {
                            $group: {
                                _id: "$userId", // retailer id
                                orderCount: { $sum: 1 }
                            }
                        },

                        {
                            $lookup: {
                                from: "users",
                                localField: "_id",
                                foreignField: "_id",
                                as: "retailerDetails"
                            }
                        },

                        {
                            $unwind: "$retailerDetails"
                        },
                        {
                            $project: {
                                _id: 0,
                                retailerId: "$retailerDetails._id",
                                vendorName: "$retailerDetails.name",
                                orderCount: 1
                            }
                        }

                    ])


                    resolve(result)


                }

                // find top sales executives

                else if (filter === USER_ROLES.SALES_EXECUTIVE) {

                    const result = await Order.aggregate([

                        {
                            $group: {
                                _id: "$assignedToSalesAgent", // sales executives id
                                orderCount: { $sum: 1 }
                            }
                        },

                        {
                            $lookup: {
                                from: "users",
                                localField: "_id",
                                foreignField: "_id",
                                as: "agentDetails"
                            }
                        },

                        {
                            $unwind: "$agentDetails"
                        },
                        {
                            $project: {
                                _id: 0,
                                agentId: "$agentDetails._id",
                                agentName: "$agentDetails.name",
                                orderCount: 1
                            }
                        }

                    ])

                    resolve(result)

                }

                else if (filter === "order") {


                    const result = await Order.aggregate([

                        {
                            $sort: {
                                totalPrice: -1,
                                createdAt: -1
                            }
                        },
                        {
                            $limit: 10
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "retailerDetails"
                            }
                        },
                        {
                            $unwind: "$retailerDetails"
                        }
                    ])


                    resolve(result)
                }
                else {

                    resolve([])
                }





            } catch (error: any) {


                reject(error.message)
            }
        })


    },




    //  find revenue data full time line

    getRevenueDetails: () => {

        return new Promise(async (resolve, reject) => {

            try {



                function getDateRanges() {
                    const now = new Date();

                    // Today
                    const todayStart = new Date(now);
                    todayStart.setHours(0, 0, 0, 0);
                    const todayEnd = new Date(now);
                    todayEnd.setHours(23, 59, 59, 999);

                    // Yesterday
                    const yesterdayStart = new Date(todayStart);
                    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
                    const yesterdayEnd = new Date(todayEnd);
                    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

                    // This week (Monday–Sunday)
                    const weekStart = new Date(todayStart);
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Sunday start
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekEnd.getDate() + 7);

                    // Last week
                    const lastWeekStart = new Date(weekStart);
                    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
                    const lastWeekEnd = new Date(weekStart);

                    // This month
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

                    // Last month
                    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

                    // This year
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

                    // Last year
                    const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
                    const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);

                    return {
                        today: [todayStart, todayEnd],
                        yesterday: [yesterdayStart, yesterdayEnd],
                        thisWeek: [weekStart, weekEnd],
                        lastWeek: [lastWeekStart, lastWeekEnd],
                        thisMonth: [monthStart, monthEnd],
                        lastMonth: [lastMonthStart, lastMonthEnd],
                        thisYear: [yearStart, yearEnd],
                        lastYear: [lastYearStart, lastYearEnd],
                    };
                }

                async function getRevenueForRange(start: Date, end: Date) {



                    const result = await SubOrder.aggregate([
                        {
                            $match: {
                                paymentStatus: "paid",
                                purchased_Date: { $gte: start, $lte: end }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$total_amount" }
                            }
                        }
                    ]);

                    return result.length > 0 ? result[0].totalRevenue : 0;
                }

                const ranges: any = getDateRanges();

                const [
                    totalRevenue,
                    thisYear,
                    lastYear,
                    thisMonth,
                    lastMonth,
                    thisWeek,
                    lastWeek,
                    today,
                    yesterday
                ] = await Promise.all([
                    // All time
                    SubOrder.aggregate([
                        { $match: { paymentStatus: "paid" } },
                        { $group: { _id: null, totalRevenue: { $sum: "$total_amount" } } }
                    ]).then(r => (r[0]?.totalRevenue ?? 0)),

                    getRevenueForRange(ranges.thisYear[0], ranges.thisYear[1]),
                    getRevenueForRange(ranges.lastYear[0], ranges.lastYear[1]),
                    getRevenueForRange(ranges.thisMonth[0], ranges.thisMonth[1]),
                    getRevenueForRange(ranges.lastMonth[0], ranges.lastMonth[1]),
                    getRevenueForRange(ranges.thisWeek[0], ranges.thisWeek[1]),
                    getRevenueForRange(ranges.lastWeek[0], ranges.lastWeek[1]),
                    getRevenueForRange(ranges.today[0], ranges.today[1]),
                    getRevenueForRange(ranges.yesterday[0], ranges.yesterday[1]),
                ]);

                resolve({
                    revenue: {
                        total: totalRevenue,
                        thisYear,
                        lastYear,
                        thisMonth,
                        lastMonth,
                        thisWeek,
                        lastWeek,
                        today,
                        yesterday
                    }
                });

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    // get revenue data for graphical display

    getRevenuedataGraphical: (filter: string) => {


        return new Promise(async (resolve, reject) => {


            try {


                const now = new Date();
                let groupId: any;
                let startDate: Date;

                switch (filter) {
                    case 'day':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        groupId = { hour: { $hour: "$createdAt" } };
                        break;

                    case 'week':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);
                        groupId = { week: { $week: "$createdAt" } };
                        break;

                    case 'month':
                        startDate = new Date(now.getFullYear(), 0, 1); // Jan 1st
                        groupId = { month: { $month: "$createdAt" } };
                        break;

                    case 'year':
                        startDate = new Date(now.getFullYear() - 4, 0, 1); // Last 5 years
                        groupId = { year: { $year: "$createdAt" } };
                        break;

                    default:
                        startDate = new Date(now.getFullYear(), 0, 1);
                        groupId = { month: { $month: "$createdAt" } };
                }


                let result = []


                result = await SubOrder.aggregate([
                    {
                        $match: {

                            paymentStatus: "paid",
                            createdAt: { $gte: startDate }
                        }
                    },
                    {
                        $group: {
                            _id: groupId,
                            totalRevenue: { $sum: "$total_amount" }
                        }
                    },
                    { $sort: { "_id": 1 } }
                ]);



                if (result.length === 0) {

                    resolve(result)
                    return;
                }


                let formattedResult: number[] = [];

                switch (filter) {
                    case 'day':
                        formattedResult = Array(24).fill(0);
                        result.forEach(item => { formattedResult[item._id.hour] = item.totalRevenue; });
                        break;
                    case 'week':
                        formattedResult = Array(4).fill(0);
                        const currentWeek = Math.ceil(((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)));
                        result.forEach(item => {
                            const idx = (item._id.week - currentWeek + 4) % 4;
                            formattedResult[idx] = item.totalRevenue;
                        });
                        break;
                    case 'month':
                        formattedResult = Array(12).fill(0);
                        result.forEach(item => { formattedResult[item._id.month - 1] = item.totalRevenue; });
                        break;
                    case 'year':
                        formattedResult = Array(5).fill(0);
                        result.forEach(item => { formattedResult[item._id.year - startDate.getFullYear()] = item.totalRevenue; });
                        break;
                }

                resolve(formattedResult);


            } catch (error: any) {

                reject(error.message)
            }

        })
    },

    // get revenue data for role based filter

    getSubScriptionCountDataByRole: (role: string) => {


        return new Promise(async (resolve, reject) => {

            try {


                const result = await SubOrder.aggregate([

                    {
                        $lookup: {
                            from: "subscriptionPlan",
                            foreignField: "_id",
                            localField: "planId",
                            as: "planDetails"
                        }
                    },
                    {
                        $unwind: "$planDetails"
                    },

                    {
                        $match: { "$planDetails.role": role, paymentStatus: "paid" }
                    },

                    {
                        $group: {

                            _id: "$planDetails.plan",
                            count: { $sum: 1 }
                        }
                    },

                    {
                        $project: {

                            _id: 1,
                            count: 1
                        }
                    }
                ])

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },


    // get revenue data for graphical display role based filter

    getRevenuedataGraphicalByRole: (filter: string, role: string) => {


        return new Promise(async (resolve, reject) => {


            try {


                const now = new Date();
                let groupId: any;
                let startDate: Date;

                switch (filter) {
                    case 'day':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        groupId = { hour: { $hour: "$createdAt" } };
                        break;

                    case 'week':
                        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);
                        groupId = { week: { $week: "$createdAt" } };
                        break;

                    case 'month':
                        startDate = new Date(now.getFullYear(), 0, 1); // Jan 1st
                        groupId = { month: { $month: "$createdAt" } };
                        break;

                    case 'year':
                        startDate = new Date(now.getFullYear() - 4, 0, 1); // Last 5 years
                        groupId = { year: { $year: "$createdAt" } };
                        break;

                    default:
                        startDate = new Date(now.getFullYear(), 0, 1);
                        groupId = { month: { $month: "$createdAt" } };
                }


                let result = []


                result = await SubOrder.aggregate([
                    {
                        $lookup: {
                            from: "subscriptionPlan",
                            foreignField: "_id",
                            localField: "planId",
                            as: "planDetails"
                        }
                    },
                    {
                        $unwind: "$planDetails"
                    },


                    {
                        $match: {

                            paymentStatus: "paid",
                            "$planDetails.role": role,
                            createdAt: { $gte: startDate }
                        }
                    },
                    {
                        $group: {
                            _id: groupId,
                            totalRevenue: { $sum: "$total_amount" }
                        }
                    },
                    { $sort: { "_id": 1 } }
                ]);



                if (result.length === 0) {

                    resolve(result)
                    return;
                }


                let formattedResult: number[] = [];

                switch (filter) {
                    case 'day':
                        formattedResult = Array(24).fill(0);
                        result.forEach(item => { formattedResult[item._id.hour] = item.totalRevenue; });
                        break;
                    case 'week':
                        formattedResult = Array(4).fill(0);
                        const currentWeek = Math.ceil(((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)));
                        result.forEach(item => {
                            const idx = (item._id.week - currentWeek + 4) % 4;
                            formattedResult[idx] = item.totalRevenue;
                        });
                        break;
                    case 'month':
                        formattedResult = Array(12).fill(0);
                        result.forEach(item => { formattedResult[item._id.month - 1] = item.totalRevenue; });
                        break;
                    case 'year':
                        formattedResult = Array(5).fill(0);
                        result.forEach(item => { formattedResult[item._id.year - startDate.getFullYear()] = item.totalRevenue; });
                        break;
                }

                resolve(formattedResult);


            } catch (error: any) {

                reject(error.message)
            }

        })
    },

    // get revenue data by this month. role based filter

    getRevenuedatabymonthByRole: (role: string) => {


        return new Promise(async (resolve, reject) => {

            try {



                function getDateRanges() {
                    const now = new Date();


                    // This month
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

                    // Last month
                    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);


                    return {

                        thisMonth: [monthStart, monthEnd],
                        lastMonth: [lastMonthStart, lastMonthEnd],

                    };
                }

                async function getRevenueForRange(start: Date, end: Date) {



                    const result = await SubOrder.aggregate([

                        {
                            $lookup: {
                                from: "subscriptionPlan",
                                foreignField: "_id",
                                localField: "planId",
                                as: "planDetails"
                            }
                        },
                        {
                            $unwind: "$planDetails"
                        },
                        {
                            $match: {
                                paymentStatus: "paid",
                                "$planDetails.role": role,
                                purchased_Date: { $gte: start, $lte: end }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$total_amount" }
                            }
                        }
                    ]);

                    return result.length > 0 ? result[0].totalRevenue : 0;
                }

                const ranges: any = getDateRanges();

                const [
                    totalRevenue,

                    thisMonth,
                    lastMonth,

                ] = await Promise.all([
                    // All time
                    SubOrder.aggregate([

                        {
                            $lookup: {
                                from: "subscriptionPlan",
                                foreignField: "_id",
                                localField: "planId",
                                as: "planDetails"
                            }
                        },
                        {
                            $unwind: "$planDetails"
                        },

                        { $match: { paymentStatus: "paid", "$planDetails.role": role } },
                        { $group: { _id: null, totalRevenue: { $sum: "$total_amount" } } }
                    ]).then(r => (r[0]?.totalRevenue ?? 0)),


                    getRevenueForRange(ranges.thisMonth[0], ranges.thisMonth[1]),
                    getRevenueForRange(ranges.lastMonth[0], ranges.lastMonth[1]),

                ]);

                resolve({
                    revenue: {
                        total: totalRevenue,

                        thisMonth,
                        lastMonth,

                    }
                });

            } catch (error: any) {

                reject(error.message)
            }
        })


    }







}
