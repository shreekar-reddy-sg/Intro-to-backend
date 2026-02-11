import mongoose,{ Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique: true,
        trim: true,
        minLenghth: 3,
        maxLength: 30
    },
    email: {
        type:String,
        required:true,
        unique: true,
        lowercase: true
    },
    password: {
        type:String,
        required:true,
        minLength: 6
    }
});

export const User = mongoose.model("User",userSchema);