


import { z } from 'zod';


export const brandSchema = z.object({
    name: z.string().nonempty("brand name is required"),
    imageUrl: z.string().nonempty("brand image is required"),
    
}); 

export const brandisActiveSchema = z.object({
    isActive: z.boolean()
    
}); 