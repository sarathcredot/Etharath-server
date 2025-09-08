
import { assert } from "console"
import { InstantCounrt } from "../../models/instantCourt"
import { IInstantCountType } from "../../types/instantCourt"
import { ObjectId } from "mongoose"


export const instantCourtService = {


    addCount: (data: IInstantCountType) => {

        return new Promise(async (resolve, reject) => {

            try {

                let products = []

                for (let item of (data.products as Array<{ productId: string; quantity: number; total: number }>)) {

                    products.push({
                        productId: item.productId,
                        quantity: item.quantity,
                        total: item.total
                    })
                }


                const final = new InstantCounrt({
                    createdBy: data.createdBy,
                    userName: data.userName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    place: data.place,
                    totalAmmount: data.totalAmmount,
                    products: products
                })

                const result = await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    getInstantCourt: (createdBy: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await InstantCounrt.find({ createdBy: createdBy })

                resolve(result);

            } catch (error: any) {

                reject(error.message)
            }

        })
    }


}