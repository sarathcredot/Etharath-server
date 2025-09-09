



import { z } from 'zod';


export const productSchema = z.object({

    productName: z.string().min(1, "Product name is required"),
    brand: z.string().min(1, "Brand ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.array(z.string().min(1, "Image is required")).nonempty("At least one image is required"),
    origin: z.string().min(1, "Origin is required"),

    yearOfManufacturer: z
        .number()
        .int("Year must be an integer")
        .gte(1900, "Year must be after 1900") // adjust as needed
        .lte(new Date().getFullYear(), "Year cannot be in the future"),

    width: z
        .number()
        .positive("Width must be greater than 0"),

    height: z
        .number()
        .positive("Height must be greater than 0"),

    size: z
        .number()
        .min(1, "Size is required")




}); 