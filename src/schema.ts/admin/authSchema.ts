
import { z } from 'zod';


export const adminAuthSchema = z.object({
    userName: z.string("userName is required").nonempty("Name is required").min(1, "Name is required"),
    email: z.string("email is required").nonempty("Email is required").email("Invalid email format"),
    phoneNumber: z.string("phoneNumber is required").nonempty("Phone number is required").min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be at most 15 characters"),
    password: z.string("password is required").nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    
}); 





