
import { User } from "../models/user"
import {UserReqType} from "../types/userTypes"

export const userService = {

    getProfile: (id: any) => {


        return new Promise(async (resolve, reejct) => {

            try {

                const result = await User.findById({ _id: id })

                resolve(result)

            } catch (error: any) {

                reejct(error.message)
            }
        })
    },


    updateProfile: (id: any,data:UserReqType) => {


        return new Promise(async (resolve, reejct) => {

            try {

                const result = await User.findByIdAndUpdate({ _id: id },{

                    $set:{

                        ...data
                    }
                },
                {
                    new:true
                }
            )

                resolve(result)

            } catch (error: any) {

                reejct(error.message)
            }
        })
    }
}