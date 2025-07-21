import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUserType } from '../types/userTypes';
import { USER_ROLES ,VERIFY_STATUS} from '../utils/constants';



const UserSchema = new Schema<IUserType>({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl:{
        type:String,
    },
    password: {
        type: String,
    },
       
    role: {
        type: String,
        required: true,
        enum: USER_ROLES,
        
        
    },
    isVerified: {
        type: String,
        default: VERIFY_STATUS.PENDING
    },
    isSuspend: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

export const User = model<IUserType>('User', UserSchema);





