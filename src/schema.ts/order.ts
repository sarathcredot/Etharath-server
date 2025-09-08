


import { z } from 'zod';


export const orderPlace = z.object({

     stockByVendor: z.string().nonempty("select a stock"),
     quantity: z.string().nonempty("select stock quantity"),
     totalPrice:z.string().nonempty("select total price")
})