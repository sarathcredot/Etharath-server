
import { ProductType, GetallArrgu } from "../../types/product"
import { Product } from "../../models/product"
import { VERIFY_STATUS } from "../../utils/constants"
import { Brand } from "../../models/brand";

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
                    Product.find(query)
                        .skip(skip)
                        .limit(limit)
                        .sort({ createdAt: -1 }), // optional: sort by latest
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

                const product = await Product.findById({ _id: proID })

                if (!product) {

                    throw new Error("product not found")
                }

                resolve(product)

            } catch (error: any) {
                reject(error.message);
            }
        });
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

                const result = await Product.findByIdAndDelete({ id: proId })

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
    }

}