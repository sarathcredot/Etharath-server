

// import { z, ZodError } from 'zod';
// import { Request, Response, NextFunction } from 'express';
// import { handleResponse } from './responseHandler';

// export const validation = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
//     try {
//         schema.parse(req.body);
//         next();
//     } catch (error: unknown) {
//         if (error instanceof ZodError) {
//             console.log("validation error", error.issues);
//             const firstMessage = error.issues[0]?.message || "";
//             return handleResponse.handleError(res, "Validation error", firstMessage, 400);
//         }
//         next(error);
//     }
// };



import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { handleResponse } from './responseHandler';

export const validation = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("value", req.body)
        schema.parse(req.body);
        next();
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.log("validation error", error.issues);

            // Get the first error message
            const firstError = error.issues[0];
            const errorMessage = firstError?.message;

            // Optional: Format with field name for better context
            // const fieldName = firstError?.path.join('.') || 'field';
            // const errorMessage = `${fieldName}: ${firstError?.message || "Validation failed"}`;

            return handleResponse.handleError(res, "validation error", errorMessage, 400);
        }
        next(error);
    }
};



export const validationForGet = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("value", req.query)
        schema.parse(req.query);
        next();
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.log("validation error", error.issues);

            // Get the first error message
            const firstError = error.issues[0];
            const errorMessage = firstError?.message;

            // Optional: Format with field name for better context
            // const fieldName = firstError?.path.join('.') || 'field';
            // const errorMessage = `${fieldName}: ${firstError?.message || "Validation failed"}`;

            return handleResponse.handleError(res, "validation error", errorMessage, 400);
        }
        next(error);
    }
};