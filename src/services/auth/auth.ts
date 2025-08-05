import { LoginDataType, UserReqType } from "../../types/userTypes"
import { User } from "../../models/user"
import { Otp } from "../../models/otp"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { genarateOtp } from "../../utils/otp"
import {VERIFY_STATUS,USER_ROLES} from "../../utils/constants"



export const authService = {


    register: (data: UserReqType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const existUser: any = await User.findOne({
                    $or: [
                        { email: data.email },
                        { phoneNumber: data.phoneNumber }
                    ]
                });

                if (data.role === USER_ROLES.ADMIN || data.role === USER_ROLES.SALES_EXECUTIVE  ) {

                    throw new Error("please select valid type for user")
                }

                if (existUser) {
                    throw new Error("User already exists with this email or phone number");
                }

                

                const saveData = {
                    ...data,
                    isVerified: VERIFY_STATUS.PENDING
                };

                const finalUser = new User(saveData)
                const result = await finalUser.save()

                const otp = genarateOtp()
                const expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + 10);

                const final = new Otp({ otp: otp, userId: result._id, expiresAt: expiresAt })
                await final.save()

                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    login: (data: LoginDataType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const userExit = await User.findOne({
                    $or: [
                        { email: data.emailOrPhoneNumber },
                        { phoneNumber: data.emailOrPhoneNumber }
                    ]
                })


                if (!userExit) {

                    throw new Error("User not found with this email or phone number")

                }

                if (userExit.isSuspend) {

                    throw new Error("Your account is suspended, please contact support")
                }

                // if (userExit.type === "admin") {

                //     resolve(userExit)

                // } else {

                //     const otp = genarateOtp()
                //     const expiresAt = new Date();
                //     expiresAt.setMinutes(expiresAt.getMinutes() + 10);

                //     const final = new Otp({ otp: otp, userId: userExit._id, expiresAt: expiresAt })
                //     await final.save()

                //     // sent otp in user mobile number

                //     resolve(userExit)

                // }

                if (userExit.role === "admin") {

                    if (!data.password) {

                        throw new Error("Password is required for admin login")
                    }


                    if (userExit.password) {

                        const isPasswordMatch = await bcrypt.compare(data.password, userExit.password);

                        if (!isPasswordMatch) {
                            throw new Error("Invalid password")
                        }

                        if (userExit.isSuspend) {

                            throw new Error("Your account is suspended, please contact support")

                        }

                        if (!process.env.JWT_SECRET) {
                            throw new Error("JWT_SECRET is not defined in environment variables");
                        }
                        const token = jwt.sign(
                            {
                                userId: userExit._id,
                                userName: userExit.userName,
                                email: userExit.email,
                                role: userExit.role,

                            },
                            process.env.JWT_SECRET as string,
                            { expiresIn: '7d' }
                        )

                        resolve({

                            data: userExit,
                            token: token,
                            message: "Login successful"
                        })
                        return;



                    }

                } else {


                    if (userExit.isSuspend) {

                        throw new Error("Your account is suspended, please contact support")
                    }

                    // set otp

                    //  clear this user exist otp detail before generating new otp
                    await Otp.deleteOne({ userId: userExit._id })

                    const otp = genarateOtp()
                    const expiresAt = new Date();
                    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

                    const final = new Otp({ otp: otp, userId: userExit._id, expiresAt: expiresAt })
                    await final.save()

                    // sent otp in user mobile number

                    resolve(

                        {
                            data: userExit,
                            message: "OTP sent to your registered mobile number"
                        }
                    )
                    return;



                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    },



    verifyOtp: (data: { emailOrPhoneNumber: string, otp: string }) => {

        return new Promise(async (resolve, reject) => {


            try {

                const userExit = await User.findOne({
                    $or: [
                        { email: data.emailOrPhoneNumber },
                        { phoneNumber: data.emailOrPhoneNumber }
                    ]
                })


                if (!userExit) {

                    throw new Error("User not found")

                }

                const checkOtpRequested = await Otp.findOne({ userId: userExit._id })
                if (!checkOtpRequested) {

                    throw new Error("No OTP request found")
                }

                if (new Date() > checkOtpRequested.expiresAt) {
                    throw new Error('OTP has expired');
                }

                if (checkOtpRequested.otp !== data.otp) {
                    throw new Error('Invalid OTP');
                }

                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined in environment variables");
                }

                await Otp.findByIdAndDelete({ _id: checkOtpRequested._id })

                const token = jwt.sign(
                    {
                        userId: userExit._id,
                        userName: userExit.userName,
                        email: userExit.email,
                        role: userExit.role,

                    },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '7d' }
                )

                resolve({

                    userData: userExit,
                    token: token
                })



            } catch (error: any) {

                reject(error.message)
            }


        })


    }

}

