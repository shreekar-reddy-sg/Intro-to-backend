import mongoose,{ Schema } from 'mongoose';
import bcrypt from 'bcrypt';   
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

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User",userSchema);