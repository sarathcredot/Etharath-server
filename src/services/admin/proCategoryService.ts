

import { ProCategory } from "../../models/productCategory"



export const proCategoryService = {


    addCategory: (data: string) => {

        return new Promise(async (resolve, reject) => {

            try {

                //  check this category is exist

                const existCategory = await ProCategory.findOne({ values: data })
                if (existCategory) {

                    throw new Error("This product category already exists ")
                }

                const result = await ProCategory.updateOne({},
                    {
                        $push: {
                            values: data
                        }
                    },
                    { upsert: true }
                )

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getAllCategorys: () => {


        return new Promise(async (resolve, reject) => {

            try {

                const result = await ProCategory.find()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    deleteCategory: (data: string) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await ProCategory.updateOne({},
                    {
                        $pull: {
                            values: data
                        }
                    },
                    { upsert: true }
                )

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    }
}


