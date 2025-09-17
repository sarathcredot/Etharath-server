
import { assert } from "console"
import { InstantCounrt } from "../../models/instantCourt"
import { IInstantCountType } from "../../types/instantCourt"
import { ObjectId } from "mongoose"


export const instantCourtService = {


    addCount: (data: IInstantCountType) => {

        return new Promise(async (resolve, reject) => {

            try {

                let products = []
                let totalAmount = 0

                for (let item of (data.products as Array<{ stockId: string; quantity: number; price: number; total: number }>)) {

                    products.push({
                        stockId: item.stockId,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.quantity * item.price
                    })

                    totalAmount = + (item.quantity * item.price)
                }


                const final = new InstantCounrt({
                    createdBy: data.createdBy,
                    userName: data.userName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    place: data.place,
                    totalAmount: totalAmount,
                    products: products,
                    fileUrl: data.fileUrl
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