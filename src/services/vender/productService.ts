

import { ProductType, GetallArrgu } from "../../types/product"
import { Product } from "../../models/product"
import { VERIFY_STATUS } from "../../utils/constants"
import { Brand } from "../../models/brand";





export const vendorProductService = {


    getAllProduct: ({ search,  page, limit }: GetallArrgu) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query: any = {status:VERIFY_STATUS.APPROVED};

               

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





}