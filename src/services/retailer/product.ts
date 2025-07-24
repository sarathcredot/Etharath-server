

import { ProductType, GetallArrgu, AccessRequesType, ProductStockVenderType } from "../../types/product"
import { Product, ProductStockVender } from "../../models/product"
import { VERIFY_STATUS } from "../../utils/constants"
import { Brand } from "../../models/brand";
import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import { get } from "http";



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
                    Product.countDocuments(query)
                ]);

                resolve({
                    result: products,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "Products fetched successfully",
                });

            } catch (error) {
                reject(error);
            }
        });
    },
    getProductByID: (proId: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.aggregate([
                    {
                        $match: { _id: new mongoose.Types.ObjectId(proId), isVerified: VERIFY_STATUS.APPROVED, isSuspend: false }
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
                    }
                ]);

                if (product.length === 0) {
                    return resolve(null);
                }

                resolve(product[0]);
            } catch (error) {
                reject(error);
            }
        });
    },
    productStockDetailsById: (proId: any, page: number, limit: number) => {


        return new Promise(async (resolve, reject) => {


            try {

                const skip = (page - 1) * limit;

                const productStock = await ProductStockVender.aggregate([

                    {
                        $match: { productId: new mongoose.Types.ObjectId(proId) }
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
                        $limit: limit
                    }
                ]);

                resolve(productStock);

            } catch (error: any) {

                reject(error);
            }
        })

    }


};