



import { z } from "zod";

export const kycDetailsSchema = z.object({
  businessName: z.string().nonempty("Business name is required").trim().min(1, "Business name is required"),
  tradeLicenseNumber: z.string().nonempty("Trade license number is required").trim().min(1, "Trade license number is required"),
  licenseExpiryDate: z.coerce.date().refine(
    (date) => !!date,
    { message: "License expiry date is required" }
  ),
  emiratesId: z.string().nonempty("Emirates ID is required").trim().min(1, "Emirates ID is required"),
  contactPerson: z.string().nonempty("Contact person is required").trim().min(1, "Contact person is required"),
  contactNumber: z.string().nonempty("Contact number is required").trim().min(1, "Contact number is required"),
  email: z.string().nonempty("Email is required").trim().email("Invalid email address"),
  emirate: z.enum([
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "Umm Al Quwain"
  ]),
  vatNumber: z.string().optional(),
  documents: z.object({
    tradeLicense: z.string().nonempty("Trade license document is required").trim().min(1, "Trade license document is required"),
    emiratesIdCopy: z.string().nonempty("Emirates ID copy is required").trim().min(1, "Emirates ID copy is required"),
    vatCertificate: z.string().optional()
  }),
  address: z.object({
    streetAddress: z.string().nonempty("Street address is required").trim().min(1, "Street address is required"),
    area: z.string().nonempty("Area is required").trim().min(1, "Area is required"),
    city: z.string().nonempty("City is required").trim().min(1, "City is required"),
    poBox: z.string().optional()
  })
});

export const kycDetailsSchemaForAdmin = z.object({
  businessName: z.string().nonempty("Business name is required").trim().min(1, "Business name is required"),
  tradeLicenseNumber: z.string().nonempty("Trade license number is required").trim().min(1, "Trade license number is required"),
  licenseExpiryDate: z.coerce.date().refine(
    (date) => !!date,
    { message: "License expiry date is required" }
  ),
  emiratesId: z.string().nonempty("Emirates ID is required").trim().min(1, "Emirates ID is required"),
  contactPerson: z.string().nonempty("Contact person is required").trim().min(1, "Contact person is required"),
  contactNumber: z.string().nonempty("Contact number is required").trim().min(1, "Contact number is required"),
  email: z.string().nonempty("Email is required").trim().email("Invalid email address"),
  emirate: z.enum([
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "Umm Al Quwain"
  ]),
  vatNumber: z.string().optional(),
  documents: z.object({
    tradeLicense: z.string().nonempty("Trade license document is required").trim().min(1, "Trade license document is required"),
    emiratesIdCopy: z.string().nonempty("Emirates ID copy is required").trim().min(1, "Emirates ID copy is required"),
    vatCertificate: z.string().optional()
  }),
  address: z.object({
    streetAddress: z.string().nonempty("Street address is required").trim().min(1, "Street address is required"),
    area: z.string().nonempty("Area is required").trim().min(1, "Area is required"),
    city: z.string().nonempty("City is required").trim().min(1, "City is required"),
    poBox: z.string().optional()
  }),
  // kycStatus: z.enum(["pending", "approved", "rejected"])
});
