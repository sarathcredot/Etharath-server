
import { CartModel } from "../../models/cart"
import { AddtoCart } from "../../types/cart"
import { ProductStockVender } from "../../models/product"
import { ObjectId } from "mongoose"




export const cartService = {


    addToCart: async (cartData: AddtoCart) => {

        return new Promise(async (resolve, reject) => {

            try {
                // check this user already has a cart
                const existingCart = await CartModel.findOne({ userId: cartData.userId });
                if (existingCart) {

                    for (let id of cartData.stocksId) {
                        const productIndex = existingCart.products.findIndex(
                            (p: any) => p.stockId.toString() === id.toString()
                        );

                        if (productIndex > -1) {
                            // If product exists, increase quantity
                            existingCart.products[productIndex].quantity += 1;
                        } else {
                            // If not exists, push new product
                            existingCart.products.push({ stockId: id, quantity: 1 });
                        }
                    }

                    const result = await existingCart.save();

                    // find user cart total ammount

                    if (result) {

                        const finalResult = await findCartTotalAmount(result)
                        resolve(finalResult)
                    }
                } else {

                    // create a cart for user

                    const newCart = {
                        userId: cartData.userId,
                        products: cartData.stocksId.map((id) => ({
                            stockId: id,
                            quantity: 1
                        })),
                    }

                    const final = new CartModel(newCart)
                    const result = await final.save();

                    if (result) {

                        const finalResult = await findCartTotalAmount(result)
                        resolve(finalResult)
                    }

                }

            } catch (error: any) {

                reject(error.message);
            }
        })
    },

    // getUserAllCartItems: async (userId: ObjectId) => {

    //     return new Promise(async (resolve, reject) => {

    //         try {

    //             const result = await CartModel.aggregate([
    //                 {
    //                     $match: { userId: userId }
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: "productstockvenders",
    //                         localField: "products.stockId",
    //                         foreignField: "_id",
    //                         as: "productDetails"
    //                     }
    //                 },
    //                 {
    //                     $unwind: "$productDetails"
    //                 }
    //             ])

    //             // find user Cart totalAmount




    //             resolve(result)

    //         } catch (error: any) {

    //             reject(error.message)
    //         }
    //     })
    // },

    getUserAllCartItems: async (userId: ObjectId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await CartModel.aggregate([
                    {
                        $match: { userId: userId }
                    },
                    {
                        $unwind: "$products"
                    },
                    {
                        $lookup: {
                            from: "productstockvenders",
                            localField: "products.stockId",
                            foreignField: "_id",
                            as: "stockDetails"
                        }
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
                        $unwind: "$stockDetails"
                    },
                    {
                        $addFields: {
                            itemTotal: { $multiply: ["$products.quantity", "$stockDetails.price"] }
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            userId: { $first: "$userId" },
                            products: {
                                $push: {
                                    stockId: "$products.stockId",
                                    quantity: "$products.quantity",
                                    stockDetails: "$stockDetails",
                                    productDetails:"$productDetails",
                                    itemTotal: "$itemTotal"
                                }
                            },
                            totalAmount: { $sum: "$itemTotal" }
                        }
                    }
                ]);

                resolve(result[0] || { products: [], totalAmount: 0 });

            } catch (error: any) {

                reject(error.message);
            }
        });
    },

    incrementCartItemQuantity: async (userId: ObjectId, stockId: ObjectId) => {

        return new Promise(async (resolve, reject) => {


            try {

                const updatedCart = await CartModel.findOneAndUpdate(
                    { userId: userId, "products.stockId": stockId },
                    { $inc: { "products.$.quantity": 1 } },
                    { new: true }
                );

                if (!updatedCart) {

                    throw new Error("Failed to increment cart item quantity");

                } else {

                    resolve(updatedCart);
                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    decrementCartItemQuantity: async (userId: ObjectId, stockId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                const updatedCart = await CartModel.findOneAndUpdate(
                    { userId: userId, "products.stockId": stockId },
                    { $inc: { "products.$.quantity": -1 } },
                    { new: true }
                );

                if (updatedCart) {
                    // Find the product inside the cart
                    const product = updatedCart.products.find(item => item.stockId === stockId);

                    if (product && product.quantity <= 0) {
                        await CartModel.updateOne(
                            { userId: userId },
                            { $pull: { products: { stockId: stockId } } }
                        );
                    }
                }

                if (!updatedCart) {

                    throw new Error("Failed to decrement cart item quantity");

                } else {

                    resolve(updatedCart);
                }

            } catch (error: any) {

                reject(error.message)
            }

        })
    },

    deleteCartItem: async (userId: ObjectId, stockId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                await CartModel.updateOne(
                    { userId: userId },
                    { $pull: { products: { stockId: stockId } } }
                );

                resolve("item deleted successfully");

            } catch (error: any) {

                reject(error.message)

            }
        })
    },


}

// helper function

const findCartTotalAmount = async (result: any) => {

    try {
        if (result) {

            let totalAmount = 0

            for (let item of result.products) {

                const productDetails: any = await ProductStockVender.findById({ _id: item.stockId })

                const total = item.quantity * productDetails.price
                totalAmount += total
            }

            return {
                cartData: result,
                totalAmount
            }

        }


    } catch (error: any) {

        throw new Error(error.message)
    }

}
