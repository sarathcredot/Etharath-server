

import { SupportRequest } from "../../models/support"


export const customerSupportService = {


    getAllSupportRequest: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await SupportRequest.find()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getSupportRequestDetailsById: (reqId: any) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await SupportRequest.findById(reqId)

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    }
}