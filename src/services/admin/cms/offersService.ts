
import { Offers, IOffers } from "../../../models/offers"





export const offersService = {


    createNewOffers: (data: IOffers) => {

        return new Promise(async (resolve, reject) => {

            try {


                const final = new Offers(data)

                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)

            }
        })

    },

    updateOfferById: (offerId: any, data: IOffers) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Offers.findByIdAndUpdate({ _id: offerId },
                    {
                        $set: {
                            imageUrl: data.imageUrl,
                            priority: data.priority
                        }
                    },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("Offer not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)

            }
        })


    },

    getOffers: () => {

        return new Promise(async (resolve, reject) => {

            try {


                const result = await Offers.find()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })

    },


    getOfferDetailsById: (offerId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Offers.findById(offerId)

                if (!result) {

                    throw new Error("Offer not found")

                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)

            }

        })
    },



    deleteOfferById: (offerId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Offers.findByIdAndDelete(offerId)

                if (!result) {

                    throw new Error("Offer not found")
                }

                resolve(result)

            } catch (error: any) {


                reject(error.message)
            }
        })
    },

    updateOfferStatusId: (offerId: any, status: boolean) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await Offers.findByIdAndUpdate({ _id: offerId },
                    {
                        $set: {
                            status: status
                        },
                    },
                    {
                        new: true
                    }
                )

                if (!result) {

                    throw new Error("Offer not found")
                }

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    }




}