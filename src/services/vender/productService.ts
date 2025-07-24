

import { ProductType, GetallArrgu, AccessRequesType , ProductStockVenderType } from "../../types/product"
import { Product, ProductStockVender } from "../../models/product"
import { VERIFY_STATUS } from "../../utils/constants"
import { Brand } from "../../models/brand";
import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';







export const vendorProductService = {


    getAllProduct: ({ search, page, limit }: GetallArrgu) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query: any = { isVerified: VERIFY_STATUS.APPROVED, isSuspend: false };



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


    getProductById: (proID: any) => {

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
                if (product.length === 0) {

                    throw new Error("product not found")
                }

                resolve(product[0])

            } catch (error: any) {
                reject(error.message);
            }
        });
    },


    productAccessRequestByVender: (data: AccessRequesType) => {

        return new Promise(async (resolve, reejct) => {

            try {

                const productDetails: any = await Product.findById({ _id: data.productId })

                if (!productDetails || productDetails.isVerified === VERIFY_STATUS.PENDING || productDetails.isVerified === VERIFY_STATUS.REJECTED || productDetails.isSuspend === true) {

                    throw new Error("you can't sent request this product ")
                }

                const final = new ProductStockVender(data)

                const result = await final.save()

                resolve(result)



            } catch (error: any) {

                reejct(error.message)
            }
        })

    },

    getAllMyProduct: (userId: any, data: GetallArrgu) => {

        return new Promise(async (resolve, reejct) => {

            try {

                const query: any = { requestedBy: userId }

                if (data.search) {


                }

                if (data.status) {

                    query.isVerified = data.status
                }
                if (data.isSuspend) {

                    query.isSuspend = data.isSuspend
                }

                const skip = (data.page - 1) * data.limit;

                const [products, total] = await Promise.all([

                    ProductStockVender.aggregate([

                        {
                            $match: query
                        },

                        {
                            $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "product"

                            }
                        },

                        {
                            $unwind: "$product"
                        },
                        {
                            $lookup: {
                                from: "brands",
                                localField: "product.brand",
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
                            $limit: data.limit
                        }
                    ]),

                    ProductStockVender.countDocuments(query)


                ])


                resolve({
                    result: products,
                    total,
                    currentPage: data.page,
                    totalPages: Math.ceil(total / data.limit),
                    message: "Products fetched successfully",
                });




            } catch (error: any) {

                reejct(error.message)
            }

        })


    },

    getMyProductStockById: (reqId: any) => {


        return new Promise(async (resolve, reject) => {

            try {

                const result = await ProductStockVender.findById({ _id: reqId })

                if (!result) {

                    throw new Error("no stock details found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    isSuspendProductStock: (reqId: any, isSuspend: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {

                const result = await ProductStockVender.findByIdAndUpdate(
                    { _id: reqId },
                    {
                        $set: { isSuspend: isSuspend }
                    },
                    { new: true }
                );

                if (!result) {
                    throw new Error("Product stock not found");
                }

                resolve({
                    message: isSuspend ? "Product stock suspended successfully" : "Product stock activated successfully",
                    result
                });

            } catch (error: any) {
                reject(error.message);
            }
        });
    },

    stockEditById: (reqId: any, data: ProductStockVenderType) => {
        return new Promise(async (resolve, reject) => {
            try {

                const result = await ProductStockVender.findByIdAndUpdate(
                    { _id: reqId },
                    {
                        $set: {...data}
                    },
                    { new: true }
                );

                if (!result) {
                    throw new Error("Product stock not found");
                }

                resolve({
                    message: "Product stock updated successfully",
                    result
                });

            } catch (error: any) {
                reject(error.message);
            }
        });
    },
    deleteProductStock: (reqId: any) => {
        return new Promise(async (resolve, reject) => {
            try {

                const result = await ProductStockVender.findByIdAndDelete({ _id: reqId })

                if (!result) {
                    throw new Error("Product stock not found");
                }

                resolve({
                    message: "Product stock deleted successfully",
                    result
                });

            } catch (error: any) {
                reject(error.message);
            }
        });
    }

}