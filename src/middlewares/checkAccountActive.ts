


import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"
import { User } from "../models/user"
import { VERIFY_STATUS, USER_ROLES } from "../utils/constants"


export const verifyAccountKyc = async (req: any, res: Response, next: any) => {


    try {

        const userId = req.user._id;


        const userData: any = await User.findById({ _id: userId })

        if (req.user.role === USER_ROLES.RETAILER || req.user.role === USER_ROLES.VENDER) {

            if (userData.isVerified !== VERIFY_STATUS.APPROVED) {

                throw new Error("your account is not verified. please update your kyc")
            }

        }
        next()


    } catch (error: any) {

        handleResponse.handleError(res, "", error.message, 401)

    }

}


export const verifyAccountIsSuspended = async (req: any, res: Response, next: any) => {


    try {

        const userId = req.user._id;


        const userData: any = await User.findById({ _id: userId })

        if (userData.isSuspend) {

            throw new Error("your account is suspended. contact support")
        }

        next()

    } catch (error: any) {

        handleResponse.handleError(res, "", error.message, 401)

    }

}
