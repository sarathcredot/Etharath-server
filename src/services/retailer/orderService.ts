
import { Order } from "../../models/order"
import { OrderType } from "../../types/order"
import { Product, ProductStockVender } from "../../models/product"
import { GetallArrgu } from "../../types/product"





export const retailerOrderService = {

    placeOrder: (userId: any, data: OrderType) => {

        return new Promise(async (resolve, reject) => {

            try {



                for (let stockId of data.stockByVendor) {

                    const orderStokDetails: any = await ProductStockVender.findById({ _id: stockId })
                    const productDetails = await Product.findById({ _id: orderStokDetails.productId })



                    if (!orderStokDetails || !productDetails) {
                        throw new Error("Stock details not found")
                    }
                    if (orderStokDetails.isSuspend
                        || orderStokDetails.isVerified !== "approved"
                        || productDetails.isSuspend
                        || productDetails.isVerified !== "approved"
                    ) {
                        throw new Error("you cannot place order for this stock")
                    }

                    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;


                    const final = new Order({
                        orderId: orderId,
                        userId: userId,
                        stockIdByVendor: orderStokDetails._id,
                        vendorId: orderStokDetails.requestedBy,
                        quantity: data.quantity,
                        price: orderStokDetails.price,
                        totalPrice: data.quantity * orderStokDetails.price,
                        status: "pending",
                        paymentStatus: "unpaid",


                    })
                    await final.save()
                }

                resolve({})



            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getAllMyOrders: (userId: any, { search, status, limit, page }: GetallArrgu) => {


        return new Promise(async (resolve, reject) => {

            try {

                let query: any = { userId: userId }

                if (search) {
                    query.$or = [
                        { orderId: { $regex: search, $options: 'i' } },
                    ];
                }

                if (status) {
                    query.status = status
                }

                const skip = (page - 1) * limit;

                const [orders, total] = await Promise.all([
                    Order.aggregate([
                        {
                            $match: query
                        },
                        {
                            $lookup: {
                                from: "productstockvenders",
                                localField: "stockIdByVendor",
                                foreignField: "_id",
                                as: "stockDetails"
                            }
                        },
                        {
                            $unwind: "$stockDetails"
                        },

                        {
                            $lookup: {
                                from: "products",
                                localField: "stockDetails.productId",
                                foreignField: "_id",
                                as: "productDetails"
                            }
                        },
                        {
                            $unwind: "$productDetails"
                        },

                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ]),
                    Order.countDocuments(query)
                ]);

                resolve({

                    result: orders,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "Orders fetched successfully",

                });

            } catch (error: any) {

                reject(error.message)
            }

        })

    },

    getOrderById: (orderId: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.aggregate([

                    {
                        $match: { _id: orderId }
                    },
                    {
                        $unwind: "$products"
                    },


                    {
                        $lookup: {
                            from: "productstockvenders",
                            localField: "stockIdByVendor",
                            foreignField: "_id",
                            as: "stockDetails"
                        }
                    },
                    {
                        $unwind: "$stockDetails"
                    },

                    {
                        $lookup: {
                            from: "products",
                            localField: "stockDetails.productId",
                            foreignField: "_id",
                            as: "productDetails"
                        }
                    },
                    {
                        $unwind: "$productDetails"
                    },


                ]);

                if (!order) {
                    throw new Error("Order not found");
                }

                resolve(order[0]);
            } catch (error: any) {
                reject(error.message);
            }
        });
    },



    cancelMyOrderById: (orderId: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.findOneAndUpdate(
                    { orderId: orderId },
                    { status: "cancelled" },
                    { new: true }
                );

                if (!order) {
                    throw new Error("Order not found");
                }

                resolve(order);

            } catch (error: any) {

                reject(error.message);


            }
        });
    }


}