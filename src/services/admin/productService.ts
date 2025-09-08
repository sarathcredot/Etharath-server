
import { ProductType, GetallArrgu } from "../../types/product"
import { Product, ProductStockVender } from "../../models/product"
import { VERIFY_STATUS } from "../../utils/constants"
import { Brand } from "../../models/brand";
import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';


export const adminProductService = {


    getAllProduct: ({ search, status, isSuspend, page, limit }: GetallArrgu) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query: any = {};

                if (status) {
                    query.isVerified = status;
                }

                if (search) {
                    query.$or = [
                        { productName: { $regex: search, $options: 'i' } },
                        { category: { $regex: search, $options: 'i' } },
                    ];
                }

                const skip = (page - 1) * limit;

                const [products, total] = await Promise.all([
                    Product.aggregate([

                        {
                            $match: query
                        },
                        {
                            $lookup: {
                                from: "brands",
                                localField: "brand",
                                foreignField: "_id",
                                as: "brand"

                            }
                        },
                        {
                            $unwind: "$brand"
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
                    Product.countDocuments(query),
                ]);

                resolve({
                    result: products,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "Products fetched successfully",
                });
            } catch (error) {
                reject({ message: "Failed to fetch products", error });
            }
        });
    },

    getProductById: (proID: string) => {
        return new Promise(async (resolve, reject) => {
            try {

                const product = await Product.aggregate([

                    {
                        $match: { _id: new mongoose.Types.ObjectId(proID) }
                    },
                    {
                        $lookup: {
                            from: "brands",
                            localField: "brand",
                            foreignField: "_id",
                            as: "brand"

                        }
                    },
                    {
                        $unwind: "$brand"
                    },

                ])

                if (product.length===0) {

                    throw new Error("product not found")
                }

                console.log("pro",product)

                resolve(product[0])

            } catch (error: any) {
                reject(error.message);
            }
        });
    },

    getAllStocksByProdectId: (proId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {


                let query: any = { productId: new mongoose.Types.ObjectId(proId) };

                if (data.status) {
                    query.isVerified = data.status;
                }

                if (data.search) {
                    query.$or = [
                        { location: { $regex: data.search, $options: 'i' } },

                    ];
                }

                if (data.isSuspend) {

                    query.isSuspend = data.isSuspend;

                }

                const skip = (data.page - 1) * data.limit;


                const [stock, total] = await Promise.all([

                    ProductStockVender.aggregate([

                        {
                            $match: query
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "requestedBy",
                                foreignField: "_id",
                                as: "requestedBy"

                            }

                        },
                        {
                            $unwind: "$requestedBy"
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: data.limit
                        }
                    ]),

                    ProductStockVender.countDocuments(query),


                ])

                resolve({
                    result: stock,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Product stocks fetched successfully",
                });



            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    verifyProductStockById: (proId: any, reqId: any, status: string) => {

        return new Promise(async (resolve, reject) => {

            try {


                const result = await ProductStockVender.findOneAndUpdate({ _id: reqId, productId: proId }, {

                    $set: {
                        isVerified: status
                    }
                },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("not stock details found")
                }

                resolve({
                    result,
                    message: `this product varification update to ${status}`
                })


            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    isSuspendProductStock: (proId: any, reqId: any, isSuspend: boolean) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await ProductStockVender.findOneAndUpdate({ _id: reqId, productId: proId }, {

                    $set: {
                        isSuspend: isSuspend
                    }
                },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("not stock details found")
                }

                resolve({
                    result,
                    message: isSuspend ? "this stock suspended succssfully" : "this stock activated succssfully"
                })



            } catch (error: any) {

                reject(error.message)
            }

        })
    },




    addProduct: (id: any, data: ProductType) => {

        return new Promise(async (resolve, reject) => {

            try {

                // check this product brand is active or not

                const brandData = await Brand.findById({ _id: data.brand })

                if (!brandData?.isActive) {

                    throw new Error("this selected brand not active")
                }

                const final = new Product({
                    ...data,
                    isVerified: VERIFY_STATUS.APPROVED,
                    createdBY: id
                })
                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)

            }
        })
    },

    updateProduct: (proId: any, data: ProductType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Product.findByIdAndUpdate({ _id: proId },

                    {
                        $set: {
                            ...data
                        }
                    },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("product not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)

            }
        })
    },

    deleteProduct: (proId: any) => {

        return new Promise(async (response, reject) => {

            try {

                const result = await Product.findByIdAndDelete({ _id: proId })

                if (!result) {

                    throw new Error("product not found")
                }

                response(result)

            } catch (error: any) {

                reject(error.message)

            }

        })
    },

    verifyProduct: (proId: any, status: string) => {

        return new Promise(async (response, reject) => {

            try {

                const result = await Product.findByIdAndUpdate({ _id: proId }, {

                    $set: {

                        isVerified: status
                    }
                },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("product not found")
                }

                response({
                    result,
                    message: status ? "this product is suspended" : "this product is actived"
                })

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    isSuspendProduct: (proId: any, isSuspend: boolean) => {

        return new Promise(async (response, reject) => {

            try {

                const result = await Product.findByIdAndUpdate({ _id: proId }, {

                    $set: {

                        isSuspend: isSuspend
                    }
                },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("product not found")
                }

                response(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },



}