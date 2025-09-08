



import { z } from 'zod';


export const productSchema = z.object({

    productName: z.string().min(1, "Product name is required"),
    brand: z.string().min(1, "Brand ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().min(1, "Image is required")

}); 