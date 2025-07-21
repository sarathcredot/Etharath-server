
import { z } from 'zod';


export const adminAuthSchema = z.object({
    userName: z.string().nonempty("Name is required").min(1, "Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    phoneNumber: z.string().nonempty("Phone number is required").min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be at most 15 characters"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    
}); 





