
import tr from "zod/v4/locales/tr.cjs";
import { Brand } from "../../models/brand"
import { BrandType } from "../../types/product"
import { Schema, model, Document, ObjectId } from 'mongoose';
import { GetallArrgu } from "../../types/product"



export const BrandServiceByAdmin = {


    getAllBrands: async ({ search, status, page, limit }: GetallArrgu) => {

        return new Promise(async (resolve, reject) => {

            try {

                let query: any = {}

                if (search) {

                    query.$or = [
                        { name: { $regex: search, $options: 'i' } },
                    ];
                }

                if (status) {

                    query.isActive = status
                }

               
                 const skip = (page - 1) * limit;

                const [brands, total] = await Promise.all([
                    Brand.find(query)
                        .skip(skip)
                        .limit(limit)
                        .sort({ createdAt: -1 }), // optional: sort by latest
                    Brand.countDocuments(query),
                ]);

                resolve({
                    result: brands,
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    message: "brand fetched successfully",
                });

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    getBrandsByID: async (id: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Brand.findById({ _id: id })
                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    createBrand: (data: BrandType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const brandExit = await Brand.findOne({ name: data.name })

                if (brandExit) {

                    throw new Error("this brand already exit")
                }

                const final = new Brand({
                    ...data,
                    isActive: true
                })

                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    updateBrandDetails: (id: any, data: BrandType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const brandExist = await Brand.findById({ _id: id })

                if (!brandExist) {

                    throw new Error("this brand not exist")
                }

                const result = Brand.findByIdAndUpdate({ _id: id }, {

                    $set: {
                        ...data
                    },

                }, {
                    new: true
                })

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    activeControllBrandDetails: (id: any, status: boolean ) => {

        return new Promise(async (resolve, reject) => {

            try {

                const brandExist = await Brand.findById({ _id: id })

                if (!brandExist) {

                    throw new Error("this brand not exist")
                }

                const result = Brand.findByIdAndUpdate({ _id: id }, {

                    $set: {
                        
                        isActive:status
                    },

                }, {
                    new: true
                })

                resolve({
                    result,
                    message: status ? "brand has been activated" : "brand has been deactivated."
                });

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    deleteBrand: (id: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const brandExist = await Brand.findById({ _id: id })

                if (!brandExist) {

                    throw new Error("this brand not exist")
                }

                await Brand.findByIdAndDelete({ _id: id })

                resolve("")

            } catch (error: any) {

                reject(error.message)
            }
        })
    }
}