import { z } from "zod";

export const UserRegisterSchema = z.object({
    userName: z.string().nonempty("Name is required").min(1, "Name is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    phoneNumber: z.string().nonempty("Phone number is required").min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be at most 15 characters"),
    role: z.enum(['vender', 'retailer', 'sales_executive'])
        .refine(
            (val) => ['vender', 'retailer', 'sales_executive'].includes(val),
            { message: "Invalid user role" }
        ),
})

export const getAllUsersSchema = z.object({
    role: z.enum(['vender', 'retailer', 'sales_executive'])
        .refine(
            (val) => ['vender', 'retailer', 'sales_executive'].includes(val),
            { message: "Invalid user role" }
        ),
});

export const loginSchema = z.object({
    emailOrPhoneNumber: z.string().nonempty("Email or phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});

export const passwordSchema = z.object({
    emailOrPhoneNumber: z.string().nonempty("Email or phone number is required"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
});

export const otpSchema = z.object({
    emailOrPhoneNumber: z.string().nonempty("Email or phone number is required"),
    otp: z.string().nonempty("OTP is required").length(5, "OTP must be exactly 5 characters long"),
});






export const UpdateUserSchema = z.object({
    userName: z.string().nonempty("Name is required").min(1, "Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    phoneNumber: z.string().nonempty("Phone number is required").min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be at most 15 characters"),
    role: z.enum(['vender', 'retailer', 'sales_executive'])
        .refine(
            (val) => ['vender', 'retailer', 'sales_executive'].includes(val),
            { message: "Invalid user role" }
        ),


    imgUrl: z.string().optional(),


}); 
