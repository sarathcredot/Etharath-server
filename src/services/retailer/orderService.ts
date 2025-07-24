
import { Order } from "../../models/order"
import { OrderType } from "../../types/order"
import { Product, ProductStockVender } from "../../models/product"
import { GetallArrgu } from "../../types/product"





export const retailerOrderService = {

    placeOrder: (userId: any, data: OrderType) => {

        return new Promise(async (resolve, reject) => {

            try {


                const orderStokDetails: any = await ProductStockVender.findById({ _id: data.stockByVendor })
                const productDetails = await Product.findById({ _id: orderStokDetails.productId })



                if (!orderStokDetails || !productDetails) {
                    throw new Error("Stock details not found")
                }
                if (orderStokDetails.isSuspend
                    || orderStokDetails.isVerified !== "verified"
                    || productDetails.isSuspend
                    || productDetails.isVerified !== "verified"
                ) {
                    throw new Error("you cannot place order for this stock")
                }

                const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

                const final = new Order({
                    orderId: orderId,
                    userId: userId,
                    vendorId: orderStokDetails.requestedBy,
                    productId: orderStokDetails.productId,
                    stockByVendor: data.stockByVendor,
                    quantity: data.quantity,
                    price: orderStokDetails.price,
                    totalPrice: data.totalPrice,
                    status: "pending",
                    paymentStatus: "unpaid",

                })

                const result = await final.save()

                resolve(result)



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
                                from: "products",
                                localField: "productId",
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
                        $lookup: {
                            from: "products",
                            localField: "productId",
                            foreignField: "_id",
                            as: "productDetails"
                        }
                    },
                    {
                        $unwind: "$productDetails"
                    },
                    {
                        $lookup: {
                            from: "brands",
                            localField: "productDetails.brand",
                            foreignField: "_id",
                            as: "brand"
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