

import { offersService } from "../../../services/admin/cms/offersService"
import { handleResponse } from "../../../utils/responseHandler"
import { Request, Response } from 'express';




export const offersController = {


    createNewOffers: async (req: Request, res: Response) => {

        try {

            const result = await offersService.createNewOffers(req.body)
            handleResponse.handleSuccess(res, result, "Offer created successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getAllOffers: async (req: Request, res: Response) => {


        try {

            const result = await offersService.getOffers()
            handleResponse.handleSuccess(res, result, "Offers find successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    getOfferDetailsById: async (req: Request, res: Response) => {

        try {

            const { offerId } = req.params

            const result = await offersService.getOfferDetailsById(offerId)
            handleResponse.handleSuccess(res, result, "Offer find successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    updateOfferDetailsById: async (req: Request, res: Response) => {


        try {

            const { offerId } = req.params

            const result = await offersService.updateOfferById(offerId, req.body)
            handleResponse.handleSuccess(res, result, "Offer details updtaed successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    updateOfferStatusById: async (req: Request, res: Response) => {

        try {

            const { offerId } = req.params
            const { status } = req.body
            const result = await offersService.updateOfferStatusId(offerId, status)
            handleResponse.handleSuccess(res, result, "Offer status updtaed successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    },

    deleteOfferById: async (req: Request, res: Response) => {

        try {

            const { offerId } = req.params

            const result = await offersService.deleteOfferById(offerId)
            handleResponse.handleSuccess(res, result, "Offer deleted successfully", 200);


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500);

        }
    }



}