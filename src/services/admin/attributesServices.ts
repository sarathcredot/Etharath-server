

import { Attributes } from "../../models/attribute"




export const attributesService = {


    addAttribute: (data: { type: string, attribute: string }) => {

        return new Promise(async (resolve, reject) => {

            try {

                if (data.type === "origin") {

                    const checkAttributeExist = await Attributes.findOne({ origin: data.attribute })

                    if (checkAttributeExist) {

                        throw new Error("This attribute already exists")
                    }

                    const result = await Attributes.updateOne({}, { $push: { origin: data.attribute } }, { upsert: true });

                    resolve(result)

                } else {

                    const checkAttributeExist = await Attributes.findOne({ yearOfManufacturer: data.attribute })

                    if (checkAttributeExist) {

                        throw new Error("This attribute already exists")
                    }

                    const result = await Attributes.updateOne({}, { $push: { yearOfManufacturer: data.attribute } }, { upsert: true });

                    resolve(result)
                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getAttributes: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Attributes.find()

                resolve(result[0])

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    deleteAttribute: (data: { type: string, attribute: string }) => {

        return new Promise(async (resolve, reject) => {

            try {

                if (data.type === "origin") {

                    const result = await Attributes.findOneAndUpdate({},
                        {

                            $pull: { origin: data.attribute }
                        },
                        { upsert: true }


                    )

                    if (!result) {

                        throw new Error("Invalid attribute type")
                    }

                    resolve(result)

                } else {


                    const result = await Attributes.findOneAndUpdate({},
                        {

                            $pull: { yearOfManufacturer: data.attribute }
                        },
                        { upsert: true }


                    )

                    if (!result) {

                        throw new Error("Invalid attribute type")
                    }

                    resolve(result)

                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    }

}