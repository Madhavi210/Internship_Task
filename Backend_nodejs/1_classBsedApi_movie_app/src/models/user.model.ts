import mongoose, {Schema, Document} from 'mongoose';
import { Profiles } from './profile.model';

export interface User extends Document {
    name: string,
    age: number,
    password: string,
    token: string,
    profiles: Profiles['_id']   //mongoose.Schema.Types.ObjectId
}

const userSchema: Schema = new Schema<User>({
    name: {
        type:String,
        required: [true,"name is required"],
        trim :true,
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "age is required"],
    },
    password :{
        type:String,
        required: [true , "password is required"],
        trim: true,
        unique: true,
    },
    token:{
        type:String,
    },
    profiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profiles"
        }
    ]
});

export const  User=  mongoose.model<User>("User", userSchema);


