

import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"
import { User } from "../models/user"
import { verify } from "jsonwebtoken"


export const auth = async (req: any, res: Response, next: any) => {
console.log("auth check")

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {

            console.log("no token")
            throw new Error();
        }

        const decoded: any = verify(token, process.env.JWT_SECRET || "");
        const user = await User.findOne({ _id: decoded.userId });

        

        if (!user) {
            throw new Error();
        }

        if(user.isSuspend){

             throw new Error("Your account is suspended. Please contact support.");
        }

        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        console.log("err", error)
        handleResponse.handleError(res, "", "Please authenticate", 401)
    }


}