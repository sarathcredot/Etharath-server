import { User } from "../../models/user";
import { UserReqType } from "../../types/userTypes";
import bcrypt from "bcrypt";
import { Schema, model, Document, ObjectId } from 'mongoose';
import {VERIFY_STATUS} from "../../utils/constants"


export const adminAuthService = {

    register: (adminData: UserReqType) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if admin already exists with the same email or phone number
                const existAdmin: any = await User.findOne({
                    $or: [
                        { email: adminData.email },
                        { phoneNumber: adminData.phoneNumber }
                    ]
                });

                if (existAdmin) {
                    throw new Error("Admin already exists with this email or phone number");
                }

                // Hash the password using bcrypt
                const saltRounds = 10;
                let hashedPassword
               
                if (adminData.password) {
                    hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

                }

                const saveData = {
                    ...adminData,
                    role:"admin",
                    password: hashedPassword,
                    isVerified: VERIFY_STATUS.APPROVED
                    
                };

                const newAdmin = new User(saveData);

                // Save the new admin to the database
                newAdmin.save()
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });

            } catch (error: any) {
                reject(error.message);
            }
        });
    }
};
