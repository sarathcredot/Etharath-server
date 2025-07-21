import { User } from "../../models/user";
import { USER_ROLES } from "../../utils/constants"
import { UserReqType } from "../../types/userTypes"



export const

    adminUserService = {

        getAllUsers: async (role:string) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const venders = await User.find({ role:role });
                    resolve(venders);
                } catch (error) {
                    reject(error);
                }
            });
        },

       






        getUserById: async (id: string) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const vender = await User.findById(id);
                    resolve(vender);
                }

                catch (error) {
                    reject(error);
                }
            });
        },
        updateUserById: async (id: string, data: UserReqType) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const vender = await User.findByIdAndUpdate(id, data, { new: true });
                    resolve(vender);
                }
                catch (error) {
                    reject(error);
                }
            });

        },
        isSuspendUserById: async (id: string, data: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const vender = await User.findByIdAndUpdate(id, { isSuspend: data.isSuspend }, { new: true });
                    resolve(vender);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        createUser: async (data: UserReqType) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const existVender = await User.findOne(
                        {
                            $or: [
                                { email: data.email },
                                { phoneNumber: data.phoneNumber }
                            ]
                        }
                    );

                    if (existVender) {
                        throw new Error("user already exists with this email or phone number");
                    }
                    const vender = await User.create(
                        {
                            ...data,
                            role: data.role,
                            isActive: false,
                            isSuspend: false
                        }
                    );
                    resolve(vender);
                }
                catch (error) {
                    reject(error);
                }
            });
        }
    }




