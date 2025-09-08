
import { Schema, model, Document, ObjectId } from 'mongoose';






export type IorderType = {
    orderId: string,
    userId: ObjectId,
    products: []
    totalPrice: number,
    status: string,
    stockIdByVendor: ObjectId,
    vendorId: ObjectId,
    quantity: number,
    price: number
    paymentStatus: string,
    paymentMethod: string,
    orderDate: Date,
    assignedDate: Date,
    deliveryDate: Date,
    cancelledDate: Date,
    assignedToSalesAgent: ObjectId,
}



export type OrderType = {


    stockByVendor: ObjectId[], // vendor who provided the stock
    quantity: number


}




