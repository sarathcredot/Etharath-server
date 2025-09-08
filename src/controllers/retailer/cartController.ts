
import { ObjectId } from "mongoose";
import { cartService } from "../../services/retailer/cartService"
import { handleResponse } from "../../utils/responseHandler"
import { Request, Response } from 'express';





export const cartController = {


    addToCart: async (req: any, res: Response) => {


        try {

            const userId = req.user._id;
            const { stocksId } = req.body


            const result = await cartService.addToCart({ userId, stocksId })

            handleResponse.handleSuccess(res, result, "Product added to cart successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getUserAllCartItems: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;

            const result = await cartService.getUserAllCartItems(userId)

            handleResponse.handleSuccess(res, result, "Cart items retrieved successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);
        }

    },

    incrementCartItemQuantity: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;
            const { stockId } = req.params
            const result = await cartService.incrementCartItemQuantity(userId, stockId)

            handleResponse.handleSuccess(res, result, "Cart item quantity incremented successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }

    },

    decrementCartItemQuantity: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;
            const { stockId } = req.params
            const result = await cartService.decrementCartItemQuantity(userId, stockId)

            handleResponse.handleSuccess(res, result, "Cart item quantity decremented successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }

    },

    deleteCartItem: async (req: any, res: Response) => {

        try {

            const userId = req.user._id;
            const { stockId } = req.params
            const result = await cartService.deleteCartItem(userId, stockId)

            handleResponse.handleSuccess(res, result, "Cart item deleted successfully", 200);

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }

    }

}