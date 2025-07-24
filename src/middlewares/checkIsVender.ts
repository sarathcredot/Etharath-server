


import {handleResponse} from "../utils/responseHandler"
import {USER_ROLES} from "../utils/constants"
import {Request,Response} from "express"


export const checkIsVendor = () => {
  return async (req:any, res:Response, next:any) => {
    console.log("role check")
    try {
      if (req.user.role !== USER_ROLES.VENDER) {   
        handleResponse.handleError(res,"","Access denied', 'You do not have permission to perform this action",403)   
        return;
      }
      console.log("role pass")
      next();
    } catch (error:any) {

        handleResponse.handleError(res,"",error.message,500)
    }
  };
};